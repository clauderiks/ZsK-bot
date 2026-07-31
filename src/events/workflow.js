import { bus } from "./bus.js";

export function emitStage(stage,data={}){

bus.emit("workflow",{
stage,
time:Date.now(),
...data
});

}
