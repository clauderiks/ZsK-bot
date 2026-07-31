import { router } from "../../router/index.js";

export async function securityTask(prompt){
return await router(
"Security review:\n"+prompt
);
}
