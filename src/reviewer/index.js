import { router } from "../router/index.js";

export async function review(prompt){
return await router(
"Review the implementation:\n"+prompt
);
}
