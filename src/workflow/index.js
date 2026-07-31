import { createPlan } from "../planner/index.js";
import { execute } from "../executor/index.js";
import { setState,State } from "../state/index.js";
import { runTests } from "../tester/index.js";
import { review } from "../reviewer/index.js";
import { commit } from "../committer/index.js";
import { emitStage } from "../events/workflow.js";
import { log } from "../logger/index.js";

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

log("workflow","planning");
emitStage("planning");
setState(State.PLANNING);

const plan=createPlan(prompt);

log("workflow","executing");
emitStage("executing");
setState(State.EXECUTING);

const result=await execute(
plan,
workers,
prompt
);

await review(prompt);

log("workflow","testing");
emitStage("testing");
setState(State.TESTING);

const ok=runTests();

if(ok){

log("workflow","committing");
emitStage("committing");
setState(State.COMMITTING);

commit();

}

log("workflow","done");
emitStage("done");
setState(State.DONE);

return result;

}
