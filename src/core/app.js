import { getDiff } from "../github/pr.js";
import { router } from "../router/index.js";
import { commentReview } from "../github/review.js";

export async function runReview() {
  const diff = getDiff();

  const review = await router(diff);

  console.log(review);

  if (
    process.env.GITHUB_OWNER &&
    process.env.GITHUB_REPO &&
    process.env.PR_NUMBER &&
    process.env.GITHUB_TOKEN
  ) {
    await commentReview(
      process.env.GITHUB_OWNER,
      process.env.GITHUB_REPO,
      Number(process.env.PR_NUMBER),
      review
    );
  }
}
