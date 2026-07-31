import { router } from "../../router/index.js";

export async function performanceTask(prompt){
return await router(
"Performance review:\n"+prompt
);
}
