export const State={
IDLE:"idle",
PLANNING:"planning",
EXECUTING:"executing",
TESTING:"testing",
FIXING:"fixing",
COMMITTING:"committing",
DONE:"done",
ERROR:"error"
};

let current=State.IDLE;

export function setState(state){
current=state;
console.log("[STATE]",state);
}

export function getState(){
return current;
}
