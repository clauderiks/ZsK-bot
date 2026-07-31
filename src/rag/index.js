import fg from "fast-glob";
import { readFile } from "node:fs/promises";
import { add,search } from "../vector/index.js";

export async function indexRepo(){
  const files=await fg(["src/**/*.js","README.md"]);

  for(const file of files){
    const text=await readFile(file,"utf8");
    add(file,[],text);
  }
}

export async function retrieve(query){
  return search(query);
}
