import fg from "fast-glob";
import { readFile } from "node:fs/promises";

import { embedding } from "../embed/index.js";
import { add,search } from "../vector/index.js";

export async function indexRepo(){

const files=await fg([
"src/**/*.js",
"README.md"
]);

for(const file of files){

const text=await readFile(file,"utf8");

const vec=await embedding(text);

add(file,vec,text);

}

}

export async function retrieve(query){

const vec=await embedding(query);

return search(vec);

}
