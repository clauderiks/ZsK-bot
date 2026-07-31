import { execSync } from "node:child_process";

export function getDiff() {
  try {
    return execSync("git diff HEAD~1", { encoding: "utf8" });
  } catch {
    return "";
  }
}
