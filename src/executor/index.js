export async function execute(plan,workers,prompt){

const result={};

for(const task of plan){

result[task.agent]=await workers[task.agent](prompt);

}

return result;

}
