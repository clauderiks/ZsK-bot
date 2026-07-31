import { getDiff } from "../github/pr.js";
import { reviewer } from "../agents/reviewer.js";
import { openaiProvider } from "../providers/openai.js";

export async function runReview() {
  const diff = getDiff();
  const result = await reviewer(diff, openaiProvider);
  console.log(result);
}
