import models from "../config/models.js";

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

export async function router(diff) {
  const model = models.default;
  return providers[model](diff);
}
