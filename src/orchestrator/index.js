import { workflow } from "../workflow/index.js";

export async function runAll(prompt){
return await workflow(prompt);
}
