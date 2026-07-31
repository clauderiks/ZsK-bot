import { getDiff } from "../github/pr.js";
import { router } from "../router/index.js";

export async function runReview() {
  const diff = getDiff();
  const result = await router(diff);
  console.log(result);
}
