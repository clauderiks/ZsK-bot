import { execSync } from "node:child_process";

export function status(){
return execSync("git status --short",{encoding:"utf8"});
}

export function diff(){
return execSync("git diff",{encoding:"utf8"});
}

export function log(){
return execSync("git log --oneline -10",{encoding:"utf8"});
}
