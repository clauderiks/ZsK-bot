import { openaiProvider } from "../providers/openai.js";
import { claudeProvider } from "../providers/claude.js";
import { geminiProvider } from "../providers/gemini.js";
import { qwenProvider } from "../providers/qwen.js";

const providers = {
  openai: openaiProvider,
  claude: claudeProvider,
  gemini: geminiProvider,
  qwen: qwenProvider
};

export async function router(task) {
  const model =
    process.env.DEFAULT_MODEL ||
    "openai";

  const ai = providers[model];

  console.log(await ai(task));
}
