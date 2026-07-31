import { openaiProvider } from "../providers/openai.js";
import { claudeProvider } from "../providers/claude.js";
import { geminiProvider } from "../providers/gemini.js";
import { qwenProvider } from "../providers/qwen.js";

const providers={
  openai:openaiProvider,
  claude:claudeProvider,
  gemini:geminiProvider,
  qwen:qwenProvider
};

export async function runAll(prompt){

  const result={};

  await Promise.allSettled(

    Object.entries(providers).map(async([name,fn])=>{

      try{
        result[name]=await fn(prompt);
      }catch(e){
        result[name]={
          error:e.message
        };
      }

    })

  );

  return result;

}
