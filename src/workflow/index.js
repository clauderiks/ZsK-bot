import { createPlan } from "../planner/index.js";
import { execute } from "../executor/index.js";
import { setState,State } from "../state/index.js";

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

export async function workflow(prompt){

setState(State.PLANNING);

const plan=createPlan(prompt);

setState(State.EXECUTING);

const result=await execute(
plan,
workers,
prompt
);

setState(State.DONE);

return result;

}
