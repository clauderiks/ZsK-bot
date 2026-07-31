import { execSync } from "node:child_process";

export function commit(){

execSync("git add .",{stdio:"inherit"});

execSync(
'git commit -m "chore(agent): automated workflow commit"',
{stdio:"inherit"}
);

}
