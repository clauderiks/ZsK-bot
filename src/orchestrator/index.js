import { createPlan } from "../planner/index.js";

import { reviewTask } from "../agents/tasks/review.js";
import { securityTask } from "../agents/tasks/security.js";
import { performanceTask } from "../agents/tasks/performance.js";
import { architectureTask } from "../agents/tasks/architecture.js";

const workers={
review:reviewTask,
security:securityTask,
performance:performanceTask,
architecture:architectureTask
};

export async function runAll(prompt){

const plan=createPlan(prompt);

const result={};

await Promise.all(

plan.map(async(job)=>{
result[job.agent]=await workers[job.agent](prompt);
})

);

return result;

}
