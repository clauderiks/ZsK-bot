import OpenAI from "openai";

let client = null;

function getClient() {
  if (client) return client;

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY not configured");
  }

  client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return client;
}

export async function openaiProvider(prompt) {
  try {
    const res = await getClient().chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }]
    });

    return res.choices[0].message.content;
  } catch (error) {
    console.warn("OpenAI provider failed:", error);
    return "OpenAI provider is currently unavailable. Please try another provider or configure OPENAI_API_KEY.";
  }
}
