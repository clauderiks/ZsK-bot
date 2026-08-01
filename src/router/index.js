import { bus } from "../events/bus.js";
import models from "../config/models.js";

import { runAll } from "../orchestrator/index.js";

import { openaiProvider } from "../providers/openai.js";
import { claudeProvider } from "../providers/claude.js";
import { geminiProvider } from "../providers/gemini.js";
import { qwenProvider } from "../providers/qwen.js";
import { ohmabaProvider } from "../providers/ohmaba.js";
import { zskProvider } from "../providers/zsk.js";

const providers = {
  openai: openaiProvider,
  claude: claudeProvider,
  gemini: geminiProvider,
  qwen: qwenProvider,
  ohmaba: ohmabaProvider,
  zsk: zskProvider
};

export async function router(prompt, provider) {
  const targetProvider = provider || models.default;

  if (targetProvider === "all") {
    return await runAll(prompt);
  }

  const providerFn = providers[targetProvider];
  if (!providerFn) {
    throw new Error(`Unknown provider: ${targetProvider}`);
  }

  try {
    const result = await providerFn(prompt);

    bus.emit("ai", {
      model: targetProvider,
      response: result
    });

    return result;
  } catch (error) {
    console.error(`Provider ${targetProvider} failed:`, error);
    return `Provider ${targetProvider} is currently unavailable. Please try another provider.`;
  }
}
