import Anthropic from "@anthropic-ai/sdk";

let client = null;

function getClient() {
  if (client) return client;

  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY not configured");
  }

  client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  return client;
}

export async function claudeProvider(diff) {
  try {
    const res = await getClient().messages.create({
      model: "claude-sonnet-4",
      max_tokens: 4096,
      messages: [{ role: "user", content: diff }]
    });

    return res.content[0].text;
  } catch (error) {
    console.warn("Claude provider failed:", error);
    return "Claude provider is currently unavailable. Please try another provider or configure ANTHROPIC_API_KEY.";
  }
}
