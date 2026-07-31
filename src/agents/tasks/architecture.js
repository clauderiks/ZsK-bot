import { router } from "../../router/index.js";

export async function architectureTask(prompt){
return await router(
"Architecture review:\n"+prompt
);
}
