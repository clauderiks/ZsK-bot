import { bus } from "../events/bus.js";
import models from "../config/models.js";

import { runAll } from "../orchestrator/index.js";

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

export async function router(prompt){

  if(models.default==="all"){
    return await runAll(prompt);
  }

  const result=await providers[models.default](prompt);

bus.emit("ai",{
model:models.default,
response:result
});

return result;

}
