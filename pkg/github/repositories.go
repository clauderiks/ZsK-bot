package github

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"slices"
	"strconv"
	"strings"

	ghErrors "github.com/github/github-mcp-server/pkg/errors"
	"github.com/github/github-mcp-server/pkg/ifc"
	"github.com/github/github-mcp-server/pkg/inventory"
	"github.com/github/github-mcp-server/pkg/octicons"
	"github.com/github/github-mcp-server/pkg/scopes"
	"github.com/github/github-mcp-server/pkg/translations"
	"github.com/github/github-mcp-server/pkg/utils"
	"github.com/google/go-github/v89/github"
	"github.com/google/jsonschema-go/jsonschema"
	"github.com/modelcontextprotocol/go-sdk/mcp"
	"github.com/shurcooL/githubv4"
)

func GetCommit(t translations.TranslationHelperFunc) inventory.ServerTool {
	return NewTool(
		ToolsetMetadataRepos,
		mcp.Tool{
			Name:        "get_commit",
			Description: t("TOOL_GET_COMMITS_DESCRIPTION", "Get details for a commit from a GitHub repository"),
			Annotations: &mcp.ToolAnnotations{
				Title:        t("TOOL_GET_COMMITS_USER_TITLE", "Get commit details"),
				ReadOnlyHint: true,
			},
			InputSchema: WithPagination(&jsonschema.Schema{
				Type: "object",
				Properties: map[string]*jsonschema.Schema{
					"owner": {
						Type:        "string",
						Description: "Repository owner",
					},
					"repo": {
						Type:        "string",
						Description: "Repository name",
					},
					"sha": {
						Type:        "string",
						Description: "Commit SHA, branch name, or tag name",
					},
					"detail": {
						Type:        "string",
						Enum:        []any{"none", "stats", "full_patch"},
						Description: "Level of detail to include for changed files. \"none\" omits stats and files entirely. \"stats\" (default) includes per-file metadata: filename, status, and lines-of-code counts (additions, deletions, changes), with no patch content. \"full_patch\" additionally includes the unified diff content for each file and can be very large.",
						Default:     json.RawMessage(`"stats"`),
					},
				},
				Required: []string{"owner", "repo", "sha"},
			}),
		},
		[]scopes.Scope{scopes.Repo},
		func(ctx context.Context, deps ToolDependencies, _ *mcp.CallToolRequest, args map[string]any) (*mcp.CallToolResult, any, error) {
			owner, err := RequiredParam[string](args, "owner")
			if err != nil {
				return utils.NewToolResultError(err.Error()), nil, nil
			}
			repo, err := RequiredParam[string](args, "repo")
			if err != nil {
				return utils.NewToolResultError(err.Error()), nil, nil
			}
			sha, err := RequiredParam[string](args, "sha")
			if err != nil {
				return utils.NewToolResultError(err.Error()), nil, nil
			}
			detailRaw, err := OptionalParam[string](args, "detail")
			if err != nil {
				return utils.NewToolResultError(err.Error()), nil, nil
			}
			detail, err := parseCommitDetail(detailRaw)
			if err != nil {
				return utils.NewToolResultError(err.Error()), nil, nil
			}
			pagination, err := OptionalPaginationParams(args)
			if err != nil {
				return utils.NewToolResultError(err.Error()), nil, nil
			}

			opts := &github.ListOptions{
				Page:    pagination.Page,
				PerPage: pagination.PerPage,
			}

			client, err := deps.GetClient(ctx)
			if err != nil {
				return nil, nil, fmt.Errorf("failed to get GitHub client: %w", err)
			}
			commit, resp, err := client.Repositories.GetCommit(ctx, owner, repo, sha, opts)
			if err != nil {
				return ghErrors.NewGitHubAPIErrorResponse(ctx,
					fmt.Sprintf("failed to get commit: %s", sha),
					resp,
					err,
				), nil, nil
			}
			defer func() { _ = resp.Body.Close() }()

			if resp.StatusCode != 200 {
				body, err := io.ReadAll(resp.Body)
				if err != nil {
					return nil, nil, fmt.Errorf("failed to read response body: %w", err)
				}
				return ghErrors.NewGitHubAPIStatusErrorResponse(ctx, "failed to get commit", resp, body), nil, nil
			}

			// Convert to minimal commit
			minimalCommit := convertToMinimalCommit(commit, detail)

			r, err := json.Marshal(minimalCommit)
			if err != nil {
				return nil, nil, fmt.Errorf("failed to marshal response: %w", err)
			}

			result := utils.NewToolResultText(string(r))
			// Commit content is reachable from the repo's history; in public
			// repos anyone can land it via a PR (untrusted), in private repos
			// only collaborators can (trusted). Confidentiality follows repo
			// visibility.
			result = attachRepoVisibilityIFCLabel(ctx, deps, client, owner, repo, result, ifc.LabelCommitContents)
			return result, nil, nil
		},
	)
}

// ListCommits creates a tool to get the list of commits of a branch in a GitHub
// repository.
func ListCommits(t translations.TranslationHelperFunc) inventory.ServerTool {
	schema := &jsonschema.Schema{
		Type: "object",
		Properties: map[string]*jsonschema.Schema{
			"owner": {
				Type:        "string",
				Description: "Repository owner",
			},
			"repo": {
				Type:        "string",
				Description: "Repository name",
			},
			"sha": {
				Type:        "string",
				Description: "Commit SHA, branch or tag name to list commits of. If not provided, uses the default branch of the repository. If a commit SHA is provided, will list commits up to that SHA.",
			},
			"author": {
				Type:        "string",
				Description: "Author username or email address to filter commits by",
			},
			"path": {
				Type:        "string",
				Description: "Only commits containing this file path will be returned",
			},
			"since": {
				Type:        "string",
				Description: "Only commits after this date will be returned (ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ or YYYY-MM-DD)",
			},
			"until": {
				Type:        "string",
				Description: "Only commits before this date will be returned (ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ or YYYY-MM-DD)",
			},
		},
		Required: []string{"owner", "repo"},
	}
	schema.Properties["fields"] = fieldsSchemaProperty(
		"Subset of fields to return for each commit. If omitted, all fields are returned. Use this to reduce response size when you only need specific fields, e.g. just 'sha' and 'html_url'.",
		listCommitsItemFieldEnum,
	)
	WithPagination(schema)

	return NewTool(
		ToolsetMetadataRepos,
		mcp.Tool{
			Name:        "list_commits",
			Description: t("TOOL_LIST_COMMITS_DESCRIPTION", "Get list of commits of a branch in a GitHub repository. Returns at least 30 results per page by default, but can return more if specified using the perPage parameter (up to 100)."),
			Annotations: &mcp.ToolAnnotations{
				Title:        t("TOOL_LIST_COMMITS_USER_TITLE", "List commits"),
				ReadOnlyHint: true,
			},
			InputSchema: schema,
		},
		[]scopes.Scope{scopes.Repo},
		func(ctx context.Context, deps ToolDependencies, _ *mcp.CallToolRequest, args map[string]any) (*mcp.CallToolResult, any, error) {
			owner, err := RequiredParam[string](args, "owner")
			if err != nil {
				return utils.NewToolResultError(err.Error()), nil, nil
			}
			repo, err := RequiredParam[string](args, "repo")
			if err != nil {
				return utils.NewToolResultError(err.Error()), nil, nil
			}
			sha, err := OptionalParam[string](args, "sha")
			if err != nil {
				return utils.NewToolResultError(err.Error()), nil, nil
			}
			author, err := OptionalParam[string](args, "author")
			if err != nil {
				return utils.NewToolResultError(err.Error()), nil, nil
			}
			path, err := OptionalParam[string](args, "path")
			if err != nil {
				return utils.NewToolResultError(err.Error()), nil, nil
			}
			fields, err := OptionalStringArrayParam(args, "fields")
			if err != nil {
				return utils.NewToolResultError(err.Error()), nil, nil
			}
			sinceStr, err := OptionalParam[string](args, "since")
			if err != nil {
				return utils.NewToolResultError(err.Error()), nil, nil
			}
			untilStr, err := OptionalParam[string](args, "until")
			if err != nil {
				return utils.NewToolResultError(err.Error()), nil, nil
			}
			pagination, err := OptionalPaginationParams(args)
			if err != nil {
				return utils.NewToolResultError(err.Error()), nil, nil
			}
			// Set default perPage to 30 if not provided
			perPage := pagination.PerPage
			if perPage == 0 {
				perPage = 30
			}
			opts := &github.CommitsListOptions{
				SHA:    sha,
				Path:   path,
				Author: author,
				ListOptions: github.ListOptions{
					Page:    pagination.Page,
					PerPage: perPage,
				},
			}
			if sinceStr != "" {
				sinceTime, err := parseISOTimestamp(sinceStr)
				if err != nil {
					return utils.NewToolResultError(fmt.Sprintf("invalid since timestamp: %s", err)), nil, nil
				}
				opts.Since = sinceTime
			}
			if untilStr != "" {
				untilTime, err := parseISOTimestamp(untilStr)
				if err != nil {
					return utils.NewToolResultError(fmt.Sprintf("invalid until timestamp: %s", err)), nil, nil
				}
				opts.Until = untilTime
			}

			client, err := deps.GetClient(ctx)
			if err != nil {
				return nil, nil, fmt.Errorf("failed to get GitHub client: %w", err)
			}
			commits, resp, err := client.Repositories.ListCommits(ctx, owner, repo, opts)
			if err != nil {
				return ghErrors.NewGitHubAPIErrorResponse(ctx,
					fmt.Sprintf("failed to list commits: %s", sha),
					resp,
					err,
				), nil, nil
			}
			defer func() { _ = resp.Body.Close() }()

			if resp.StatusCode != 200 {
				body, err := io.ReadAll(resp.Body)
				if err != nil {
					return nil, nil, fmt.Errorf("failed to read response body: %w", err)
				}
				return ghErrors.NewGitHubAPIStatusErrorResponse(ctx, "failed to list commits", resp, body), nil, nil
			}

			// Convert to minimal commits
			minimalCommits := make([]MinimalCommit, len(commits))
			for i, commit := range commits {
				minimalCommits[i] = convertToMinimalCommit(commit, commitDetailNone)
			}

			filtered := false
			var payload any = minimalCommits
			if len(fields) > 0 {
				filteredCommits, err := filterEachField(minimalCommits, fields)
				if err != nil {
					return utils.NewToolResultErrorFromErr("failed to filter commits", err), nil, nil
				}
				payload = filteredCommits
				filtered = true
			}

			r, err := json.Marshal(payload)
			if err != nil {
				return nil, nil, fmt.Errorf("failed to marshal response: %w", err)
			}

			recordFieldsUsageFor(ctx, deps, "list_commits", minimalCommits, filtered, len(r))

			result := utils.NewToolResultText(string(r))
			// Commit content is reachable from the repo's history; integrity
			// follows the same public-untrusted / private-trusted rule as file
			// contents. Confidentiality follows repo visibility.
			result = attachRepoVisibilityIFCLabel(ctx, deps, client, owner, repo, result, ifc.LabelCommitContents)
			return result, nil, nil
		},
	)
}

// ListBranches creates a tool to list branches in a GitHub repository.
func ListBranches(t translations.TranslationHelperFunc) inventory.ServerTool {
	return NewTool(
		ToolsetMetadataRepos,
		mcp.Tool{
			Name:        "list_branches",
			Description: t("TOOL_LIST_BRANCHES_DESCRIPTION", "List branches in a GitHub repository"),
			Annotations: &mcp.ToolAnnotations{
				Title:        t("TOOL_LIST_BRANCHES_USER_TITLE", "List branches"),
				ReadOnlyHint: true,
			},
			InputSchema: WithPagination(&jsonschema.Schema{
				Type: "object",
				Properties: map[string]*jsonschema.Schema{
					"owner": {
						Type:        "string",
						Description: "Repository owner",
					},
					"repo": {
						Type:        "string",
						Description: "Repository name",
					},
				},
				Required: []string{"owner", "repo"},
			}),
		},
		[]scopes.Scope{scopes.Repo},
		func(ctx context.Context, deps ToolDependencies, _ *mcp.CallToolRequest, args map[string]any) (*mcp.CallToolResult, any, error) {
			owner, err := RequiredParam[string](args, "owner")
			if err != nil {
				return utils.NewToolResultError(err.Error()), nil, nil
			}
			repo, err := RequiredParam[string](args, "repo")
			if err != nil {
				return utils.NewToolResultError(err.Error()), nil, nil
			}
			pagination, err := OptionalPaginationParams(args)
			if err != nil {
				return utils.NewToolResultError(err.Error()), nil, nil
			}

			opts := &github.BranchListOptions{
				ListOptions: github.ListOptions{
					Page:    pagination.Page,
					PerPage: pagination.PerPage,
				},
			}

			client, err := deps.GetClient(ctx)
			if err != nil {
				return nil, nil, fmt.Errorf("failed to get GitHub client: %w", err)
			}

			branches, resp, err := client.Repositories.ListBranches(ctx, owner, repo, opts)
			if err != nil {
				return ghErrors.NewGitHubAPIErrorResponse(ctx,
					"failed to list branches",
					resp,
					err,
				), nil, nil
			}
			defer func() { _ = resp.Body.Close() }()

			if resp.StatusCode != http.StatusOK {
				body, err := io.ReadAll(resp.Body)
				if err != nil {
					return nil, nil, fmt.Errorf("failed to read response body: %w", err)
				}
				return ghErrors.NewGitHubAPIStatusErrorResponse(ctx, "failed to list branches", resp, body), nil, nil
			}

			// Convert to minimal branches
			minimalBranches := make([]MinimalBranch, 0, len(branches))
			for _, branch := range branches {
				minimalBranches = append(minimalBranches, convertToMinimalBranch(branch))
			}

			r, err := json.Marshal(minimalBranches)
			if err != nil {
				return nil, nil, fmt.Errorf("failed to marshal response: %w", err)
			}

			result := utils.NewToolResultText(string(r))
			// Branches are structural repo metadata that only collaborators
			// with push access can create, so integrity is trusted.
			// Confidentiality follows repo visibility.
			result = attachRepoVisibilityIFCLabel(ctx, deps, client, owner, repo, result, ifc.LabelRepoMetadata)
			return result, nil, nil
		},
	)
}

// CreateOrUpdateFile creates a tool to create or update a file in a GitHub repository.
func CreateOrUpdateFile(t translations.TranslationHelperFunc) inventory.ServerTool {
	return NewTool(
		ToolsetMetadataRepos,
		mcp.Tool{
			Name: "create_or_update_file",
			Description: t("TOOL_CREATE_OR_UPDATE_FILE_DESCRIPTION", `Create or update a single file in a GitHub repository. 
If updating, you should provide the SHA of the file you want to update. Use this tool to create or update a file in a GitHub repository remotely; do not use it for local file operations.

In order to obtain the SHA of original file version before updating, use the following git command:
git rev-parse <branch>:<path to file>

SHA MUST be provided for existing file updates.
`),
			Annotations: &mcp.ToolAnnotations{
				Title:        t("TOOL_CREATE_OR_UPDATE_FILE_USER_TITLE", "Create or update file"),
				ReadOnlyHint: false,
			},
			InputSchema: &jsonschema.Schema{
				Type: "object",
				Properties: map[string]*jsonschema.Schema{
					"owner": {
						Type:        "string",
						Description: "Repository owner (username or organization)",
					},
					"repo": {
						Type:        "string",
						Description: "Repository name",
					},
					"path": {
						Type:        "string",
						Description: "Path where to create/update the file",
					},
					"content": {
						Type:        "string",
						Description: "Content of the file, exactly as it should appear once written. Do not base64-encode it; this server does that before calling the REST API.",
					},
					"message": {
						Type:        "string",
						Description: "Commit message",
					},
					"branch": {
						Type:        "string",
						Description: "Branch to create/update the file in",
					},
					"sha": {
						Type:        "string",
						Description: "The blob SHA of the file being replaced. Required if the file already exists.",
					},
				},
				Required: []string{"owner", "repo", "path", "content", "message", "branch"},
			},
		},
		[]scopes.Scope{scopes.Repo},
		func(ctx context.Context, deps ToolDependencies, _ *mcp.CallToolRequest, args map[string]any) (*mcp.CallToolResult, any, error) {
			owner, err := RequiredParam[string](args, "owner")
			if err != nil {
				return utils.NewToolResultError(err.Error()), nil, nil
			}
			repo, err := RequiredParam[string](args, "repo")
			if err != nil {
				return utils.NewToolResultError(err.Error()), nil, nil
			}
			path, err := RequiredParam[string](args, "path")
			if err != nil {
				return utils.NewToolResultError(err.Error()), nil, nil
			}
			content, err := RequiredParam[string](args, "content")
			if err != nil {
				return utils.NewToolResultError(err.Error()), nil, nil
			}
			message, err := RequiredParam[string](args, "message")
			if err != nil {
				return utils.NewToolResultError(err.Error()), nil, nil
			}
			branch, err := RequiredParam[string](args, "branch")
			if err != nil {
				return utils.NewToolResultError(err.Error()), nil, nil
			}

			// json.Marshal encodes byte arrays with base64, which is required for the API.
			contentBytes := []byte(content)

			// Create the file options
			opts := &github.RepositoryContentFileOptions{
				Message: github.Ptr(message),
				Content: contentBytes,
				Branch:  github.Ptr(branch),
			}

			// If SHA is provided, set it (for updates)
			sha, err := OptionalParam[string](args, "sha")
			if err != nil {
				return utils.NewToolResultError(err.Error()), nil, nil
			}
			if sha != "" {
				opts.SHA = github.Ptr(sha)
			}

			// Create or update the file
			client, err := deps.GetClient(ctx)
			if err != nil {
				return nil, nil, fmt.Errorf("failed to get GitHub client: %w", err)
			}

			path = strings.TrimPrefix(path, "/")

			// SHA validation using Contents API to fetch current file metadata (blob SHA)
			getOpts := &github.RepositoryContentGetOptions{Ref: branch}

			if sha != "" {
				// User provided SHA - validate it's still current
				existingFile, dirContent, respCheck, getErr := client.Repositories.GetContents(ctx, owner, repo, path, getOpts)
				if respCheck != nil {
					_ = respCheck.Body.Close()
				}
				switch {
				case getErr != nil:
					// 404 means file doesn't exist - proceed (new file creation)
					// Any other error (403, 500, network) should be surfaced
					if respCheck == nil || respCheck.StatusCode != http.StatusNotFound {
						return ghErrors.NewGitHubAPIErrorResponse(ctx,
							"failed to verify file SHA",
							respCheck,
							getErr,
						), nil, nil
					}
				case dirContent != nil:
					return utils.NewToolResultError(fmt.Sprintf(
						"Path %s is a directory, not a file. This tool only works with files.",
						path)), nil, nil
				case existingFile != nil:
					currentSHA := existingFile.GetSHA()
					if currentSHA != sha {
						return utils.NewToolResultError(fmt.Sprintf(
							"SHA mismatch: provided SHA %s is stale. Current file SHA is %s. "+
								"Pull the latest changes and use git rev-parse %s:%s to get the current SHA.",
							sha, currentSHA, branch, path)), nil, nil
					}
				}
			} else {
				// No SHA provided - check if file already exists
				existingFile, dirContent, respCheck, getErr := client.Repositories.GetContents(ctx, owner, repo, path, getOpts)
				if respCheck != nil {
					_ = respCheck.Body.Close()
				}
				switch {
				case getErr != nil:
					// 404 means file doesn't exist - proceed with creation
					// Any other error (403, 500, network) should be surfaced
					if respCheck == nil || respCheck.StatusCode != http.StatusNotFound {
						return ghErrors.NewGitHubAPIErrorResponse(ctx,
							"failed to check if file exists",
							respCheck,
							getErr,
						), nil, nil
					}
				case dirContent != nil:
					return utils.NewToolResultError(fmt.Sprintf(
						"Path %s is a directory, not a file. This tool only works with files.",
						path)), nil, nil
				case existingFile != nil:
					// File exists but no SHA was provided - reject to prevent blind overwrites
					return utils.NewToolResultError(fmt.Sprintf(
						"File already exists at %s. You must provide the current file's SHA when updating. "+
							"Use git rev-parse %s:%s to get the blob SHA, then retry with the sha parameter.",
						path, branch, path)), nil, nil
				}
				// If file not found, no previous SHA needed (new file creation)
			}

			fileContent, resp, err := client.Repositories.CreateFile(ctx, owner, repo, path, opts)
			if