import { Octokit } from "@octokit/rest";

const github = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

export async function commentReview(owner, repo, pull_number, body) {
  await github.issues.createComment({
    owner,
    repo,
    issue_number: pull_number,
    body
  });
}
