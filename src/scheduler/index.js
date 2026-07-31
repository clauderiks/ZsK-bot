const jobs=[];

export function schedule(fn,interval){

const id=setInterval(fn,interval);

jobs.push(id);

return id;

}

export function stop(){

for(const id of jobs){
clearInterval(id);
}

jobs.length=0;

}
