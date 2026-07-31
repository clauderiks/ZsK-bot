import { router } from "../router/index.js";

export async function generateFix(diff){

return await router(`
You are a senior software engineer.

Fix the following code.

Return ONLY unified git patch.

${diff}
`);

}
