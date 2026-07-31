import { getDiff } from "../github/pr.js";
import { router } from "../router/index.js";
import { commentReview } from "../github/review.js";
import { generateFix } from "../fix/index.js";
import { applyPatch,commitPatch,pushPatch } from "../git/apply.js";

export async function runReview() {
  const diff = getDiff();

  const review = await router(diff);

  console.log(review);

const patch=await generateFix(diff);
console.log(patch);

if(process.env.AUTO_FIX==="true"){
try{
applyPatch(patch);
commitPatch();
pushPatch();
}catch(e){
console.error(e.message);
}
}

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
