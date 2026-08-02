import { describe, it, expect, beforeAll } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const README_PATH = path.resolve(__dirname, "../../mcp/readme.md");

const MCP_ENDPOINT = "https://learn.microsoft.com/api/mcp";

// Removes fenced code blocks (```...```) so that example code inside them
// (e.g. shell comments or a sample "## heading" in a documentation snippet)
// isn't mistaken for real markdown structure like headings.
const stripCodeFences = (text) => text.replace(/```[\s\S]*?```/g, "");

let content;

beforeAll(() => {
  content = fs.readFileSync(README_PATH, "utf8");
});

describe("mcp/readme.md", () => {
  it("exists and is non-empty", () => {
    expect(fs.existsSync(README_PATH)).toBe(true);
    expect(content.length).toBeGreaterThan(0);
  });

  it("starts with the expected top-level title", () => {
    expect(content.startsWith("# 🌟 Microsoft Learn MCP Server")).toBe(true);
  });

  describe("headings", () => {
    let headings;

    beforeAll(() => {
      headings = [
        ...stripCodeFences(content).matchAll(/^(#{1,6})\s+(.+)$/gm),
      ].map((m) => ({
        level: m[1].length,
        text: m[2].trim(),
      }));
    });

    it("contains all expected top-level (##) sections", () => {
      const topLevel = headings.filter((h) => h.level === 2).map((h) => h.text);
      expect(topLevel).toEqual([
        "🎯 Why install this?",
        "🌐 The Microsoft Learn MCP Server Endpoint",
        "🧪 Experimental Features",
        "🛠️ Currently Supported Tools",
        "💻 Microsoft Learn CLI `preview`",
        "🤖 Agent Skills",
        "🔌 Installation & Getting Started",
        "❓ Troubleshooting",
        "📚 Additional Resources",
      ]);
    });

    it("has no duplicate heading text at any level", () => {
      const texts = headings.map((h) => h.text);
      const uniq = new Set(texts);
      expect(uniq.size).toBe(texts.length);
    });

    it("has no empty heading text", () => {
      for (const h of headings) {
        expect(h.text.trim().length).toBeGreaterThan(0);
      }
    });
  });

  describe("canonical MCP endpoint", () => {
    it("is documented as its own fenced code block", () => {
      const blockRegex = /```\n(https:\/\/learn\.microsoft\.com\/api\/mcp)\n```/;
      const match = content.match(blockRegex);
      expect(match).not.toBeNull();
      expect(match[1]).toBe(MCP_ENDPOINT);
    });

    it("Standard config JSON snippet is valid JSON pointing at the canonical endpoint", () => {
      const jsonBlockRegex = /\*\*Standard config\*\* works in most clients:\n```json\n([\s\S]*?)\n```/;
      const match = content.match(jsonBlockRegex);
      expect(match).not.toBeNull();

      const parsed = JSON.parse(match[1]);
      expect(parsed).toEqual({
        servers: {
          "microsoft-learn": {
            type: "http",
            url: MCP_ENDPOINT,
          },
        },
      });
    });

    it("appears the same number of times as expected across the document", () => {
      const occurrences = content.split(MCP_ENDPOINT).length - 1;
      // endpoint code block, JSON config, VS Code table row example, plus references
      // in the OpenAI/token-budget examples (which are distinct URLs and not counted here).
      expect(occurrences).toBeGreaterThanOrEqual(4);
    });
  });

  describe("experimental features", () => {
    it("documents the OpenAI-compatible endpoint as its own URL", () => {
      expect(content).toContain(
        "```\nhttps://learn.microsoft.com/api/mcp/openai-compatible\n```"
      );
    });

    it("documents the maxTokenBudget query parameter example", () => {
      expect(content).toContain(
        "```\nhttps://learn.microsoft.com/api/mcp?maxTokenBudget=2000\n```"
      );
    });

    it("maxTokenBudget example is a well-formed URL built on the canonical endpoint", () => {
      const match = content.match(
        /```\n(https:\/\/learn\.microsoft\.com\/api\/mcp\?maxTokenBudget=\d+)\n```/
      );
      expect(match).not.toBeNull();
      const url = new URL(match[1]);
      expect(url.origin + url.pathname).toBe(MCP_ENDPOINT);
      expect(url.searchParams.get("maxTokenBudget")).toBe("2000");
    });
  });

  describe("supported tools table", () => {
    let rows;

    beforeAll(() => {
      const tableRegex =
        /\| Tool Name \| Description \| Input Parameters \|\n\|[-\s|]+\|\n((?:\|.*\n?)+)/;
      const match = content.match(tableRegex);
      expect(match).not.toBeNull();
      rows = match[1]
        .trim()
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
    });

    it("lists exactly the three expected tools", () => {
      expect(rows).toHaveLength(3);
      const names = rows.map((r) => r.match(/`([^`]+)`/)[1]);
      expect(names).toEqual([
        "microsoft_docs_search",
        "microsoft_docs_fetch",
        "microsoft_code_sample_search",
      ]);
    });

    it("every row has a non-empty description and input parameters cell", () => {
      for (const row of rows) {
        // Split on pipes: leading/trailing empties from markdown table syntax are expected.
        const trimmedCells = row.replace(/^\||\|$/g, "").split("|");
        expect(trimmedCells).toHaveLength(3);
        for (const cell of trimmedCells) {
          expect(cell.trim().length).toBeGreaterThan(0);
        }
      }
    });
  });

  describe("CLI section", () => {
    it("references the correct npm package for npx usage", () => {
      expect(content).toContain("npx @microsoft/learn-cli search");
    });

    it("references the correct npm package for global install", () => {
      expect(content).toContain("npm install -g @microsoft/learn-cli");
    });

    it("npm version badge and link both reference the @microsoft/learn-cli package", () => {
      const badgeMatch = content.match(
        /\[!\[npm version\]\((https:\/\/img\.shields\.io\/npm\/v\/@microsoft\/learn-cli[^)]*)\)\]\((https:\/\/www\.npmjs\.com\/package\/@microsoft\/learn-cli)\)/
      );
      expect(badgeMatch).not.toBeNull();
    });

    it("links to the CLI's own README for the full command reference", () => {
      expect(content).toContain("See [`cli/README.md`](cli/README.md)");
    });
  });

  describe("agent skills section", () => {
    it("documents exactly three skills with matching relative SKILL.md links", () => {
      const tableRegex =
        /\| Skill \| Purpose \| Best For \|\n\|[-\s|]+\|\n((?:\|.*\n?)+)/;
      const match = content.match(tableRegex);
      expect(match).not.toBeNull();
      const rows = match[1].trim().split("\n").filter(Boolean);
      expect(rows).toHaveLength(3);

      const expectedSkills = [
        "microsoft-docs",
        "microsoft-code-reference",
        "microsoft-skill-creator",
      ];
      expectedSkills.forEach((skill, i) => {
        expect(rows[i]).toContain(`[\`${skill}\`](skills/${skill}/SKILL.md)`);
      });
    });

    it("Quick Setup documents both the Claude Code and GitHub Copilot CLI plugin install commands", () => {
      expect(content).toContain("/plugin install microsoft-docs@claude-plugins-official");
      expect(content).toContain("/plugin install microsoftdocs/mcp");
    });

    it("manual copy instructions list the same three skill folders", () => {
      expect(content).toContain("[`microsoft-docs`](skills/microsoft-docs/)");
      expect(content).toContain(
        "[`microsoft-code-reference`](skills/microsoft-code-reference/)"
      );
      expect(content).toContain(
        "[`microsoft-skill-creator`](skills/microsoft-skill-creator/)"
      );
    });
  });

  describe("installation table", () => {
    let headerCols;
    let rowLines;

    beforeAll(() => {
      const tableRegex =
        /\| (Client) \| (One-click Installation) \| (MCP Guide) \|\n\|[-\s|]+\|\n((?:\|.*\n?)+)/;
      const match = content.match(tableRegex);
      expect(match).not.toBeNull();
      headerCols = [match[1], match[2], match[3]];
      rowLines = match[4].trim().split("\n").filter(Boolean);
    });

    it("has a header row with the three expected columns", () => {
      expect(headerCols).toEqual(["Client", "One-click Installation", "MCP Guide"]);
    });

    it("lists all expected clients in order", () => {
      const expectedClients = [
        "VS Code",
        "GitHub Copilot CLI",
        "Claude Desktop",
        "Claude Code",
        "Visual Studio",
        "Cursor IDE",
        "Codex",
        "Roo Code",
        "Cline",
        "Gemini CLI",
        "Qwen Code",
        "GitHub",
        "ChatGPT",
        "Windsurf",
        "Kiro",
      ];
      const clients = rowLines.map((row) => {
        const m = row.match(/\|\s*\*\*(.+?)\*\*\s*\|/);
        return m ? m[1] : null;
      });
      expect(clients).toEqual(expectedClients);
    });

    it("Claude Code row references the microsoft-docs plugin install command", () => {
      const claudeCodeRow = rowLines.find((r) => r.includes("**Claude Code**"));
      expect(claudeCodeRow).toBeDefined();
      expect(claudeCodeRow).toContain(
        "/plugin install microsoft-docs@claude-plugins-official"
      );
    });
  });

  describe("VS Code install badges encode the correct MCP config", () => {
    it("standard VS Code badge encodes type=http and the canonical url", () => {
      const match = content.match(
        /\[!\[Install in VS Code\]\([^)]+\)\]\(https:\/\/vscode\.dev\/redirect\/mcp\/install\?([^)]+)\)/
      );
      expect(match).not.toBeNull();
      const params = new URLSearchParams(match[1]);
      expect(params.get("name")).toBe("microsoft-learn");
      const config = JSON.parse(params.get("config"));
      expect(config).toEqual({ type: "http", url: MCP_ENDPOINT });
    });

    it("VS Code Insiders badge encodes the same config plus quality=insiders", () => {
      const match = content.match(
        /\[!\[Install in VS Code Insiders\]\([^)]+\)\]\(https:\/\/insiders\.vscode\.dev\/redirect\/mcp\/install\?([^)]+)\)/
      );
      expect(match).not.toBeNull();
      const params = new URLSearchParams(match[1]);
      expect(params.get("name")).toBe("microsoft-learn");
      expect(params.get("quality")).toBe("insiders");
      const config = JSON.parse(params.get("config"));
      expect(config).toEqual({ type: "http", url: MCP_ENDPOINT });
    });

    it("Cursor badge base64-encodes a config with the canonical url", () => {
      const match = content.match(
        /\[!\[Install in Cursor\]\([^)]+\)\]\(https:\/\/cursor\.com\/en\/install-mcp\?([^)]+)\)/
      );
      expect(match).not.toBeNull();
      const params = new URLSearchParams(match[1]);
      const decoded = Buffer.from(params.get("config"), "base64").toString("utf8");
      const config = JSON.parse(decoded);
      expect(config).toEqual({
        name: "microsoft-learn",
        type: "http",
        url: MCP_ENDPOINT,
      });
    });
  });

  describe("Building a Custom Client guidance", () => {
    let section;

    beforeAll(() => {
      const match = content.match(
        /> ### ⚠️ Building a Custom Client\n([\s\S]*?)\n\n## ❓ Troubleshooting/
      );
      expect(match).not.toBeNull();
      section = match[1];
    });

    it("lists exactly three numbered principles", () => {
      const numbered = [...section.matchAll(/^>\s*(\d+)\.\s+\*\*/gm)].map((m) =>
        Number(m[1])
      );
      expect(numbered).toEqual([1, 2, 3]);
    });

    it("mentions dynamic tool discovery, refresh-on-failure, and live updates", () => {
      expect(section).toContain("Discover Tools Dynamically");
      expect(section).toContain("Refresh on Failure");
      expect(section).toContain("Handle Live Updates");
    });
  });

  describe("troubleshooting table", () => {
    it("includes guidance for the HTTP 405 Method Not Allowed error", () => {
      const rowMatch = content.match(/\| HTTP status 405\s*\|(.+)\|/);
      expect(rowMatch).not.toBeNull();
      expect(rowMatch[1]).toContain("Method not allowed");
      expect(rowMatch[1]).toContain("MCP Inspector");
    });

    it("has a header row and at least three issue/solution entries", () => {
      const tableRegex = /\| Issue \| Possible Solution \|\n\|[-\s|]+\|\n((?:\|.*\n?)+)/;
      const match = content.match(tableRegex);
      expect(match).not.toBeNull();
      const rows = match[1].trim().split("\n").filter(Boolean);
      expect(rows.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe("links", () => {
    let links;

    beforeAll(() => {
      // Matches markdown links [text](url), excluding image links which are
      // prefixed with "!" and handled separately via badge-specific tests.
      links = [...content.matchAll(/(?<!!)\[([^\]]*)\]\(([^)]+)\)/g)].map((m) => ({
        text: m[1],
        url: m[2],
      }));
    });

    it("finds a non-trivial number of links in the document", () => {
      expect(links.length).toBeGreaterThan(10);
    });

    it("every link has non-empty link text", () => {
      for (const link of links) {
        expect(link.text.trim().length).toBeGreaterThan(0);
      }
    });

    it("every link has a non-empty target", () => {
      for (const link of links) {
        expect(link.url.trim().length).toBeGreaterThan(0);
      }
    });

    it("all external links use https, never plain http", () => {
      const externalUrls = links
        .map((l) => l.url)
        .filter((u) => /^https?:\/\//.test(u));
      for (const url of externalUrls) {
        expect(url.startsWith("http://")).toBe(false);
      }
    });

    it("internal anchor links resolve to a real heading via GitHub's slug algorithm", () => {
      // Replicates GitHub's markdown heading-slug algorithm: lowercase, strip
      // characters that aren't letters/numbers/marks/underscore/hyphen/space
      // (this removes emoji and punctuation but keeps combining marks such as
      // variation selectors), then turn each space into a hyphen without
      // collapsing repeats.
      const githubSlug = (text) =>
        text
          .toLowerCase()
          .replace(/[^\p{L}\p{N}\p{M}_\- ]/gu, "")
          .replace(/ /g, "-");

      // Include headings nested inside blockquotes (e.g. "> ### ..."), but
      // exclude anything inside fenced code blocks (sample snippets).
      const headingSlugs = [
        ...stripCodeFences(content).matchAll(/^>?\s*#{1,6}\s+(.+)$/gm),
      ].map((m) => githubSlug(m[1]));

      const anchorLinks = links.filter((l) => l.url.startsWith("#"));
      expect(anchorLinks.length).toBeGreaterThan(0);

      for (const link of anchorLinks) {
        const decodedAnchor = decodeURIComponent(link.url.slice(1));
        expect(headingSlugs).toContain(decodedAnchor);
      }
    });
  });

  it("does not contain plain-http (insecure) references to learn.microsoft.com or github.com", () => {
    expect(content).not.toMatch(/http:\/\/(learn\.microsoft\.com|github\.com)/);
  });

  it("references the MicrosoftDocs/mcp repository for support and discussions", () => {
    expect(content).toContain("https://github.com/MicrosoftDocs/mcp/discussions");
    expect(content).toContain("https://github.com/MicrosoftDocs/mcp/issues");
  });
});