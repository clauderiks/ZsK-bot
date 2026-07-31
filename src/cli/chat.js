import readline from "node:readline/promises";
import { stdin,stdout } from "node:process";
import { router } from "../router/index.js";
import { add } from "../memory/history.js";

const rl=readline.createInterface({
  input:stdin,
  output:stdout
});

while(true){

  const prompt=await rl.question("> ");

  if(prompt==="exit") break;

  add("user",prompt);

  const reply=await router(prompt);

  add("assistant",reply);

  console.log(reply);

}

rl.close();
