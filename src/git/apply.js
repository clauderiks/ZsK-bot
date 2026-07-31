import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

export function applyPatch(patch){

writeFileSync("src/patches/fix.patch",patch);

execSync("git apply src/patches/fix.patch");

}

export function commitPatch(){

execSync("git add .",{stdio:"inherit"});

execSync(
'git commit -m "fix(ai): apply generated patch"',
{stdio:"inherit"}
);

}

export function pushPatch(){

execSync("git push origin main",{stdio:"inherit"});

}
