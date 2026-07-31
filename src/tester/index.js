import { execSync } from "node:child_process";

export function runTests(){
try{
execSync("npm test",{stdio:"inherit"});
return true;
}catch{
return false;
}
}
