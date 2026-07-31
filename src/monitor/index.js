import { getMetrics } from "../metrics/index.js";

export function monitor(){
return {
status:"ok",
uptime:Date.now()-getMetrics().started,
metrics:getMetrics()
};
}
