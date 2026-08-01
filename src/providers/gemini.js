import { GoogleGenAI } from "@google/genai";

let client = null;

function getClient() {
  if (client) return client;

  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY not configured");
  }

  client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  return client;
}

export async function geminiProvider(diff) {
  try {
    const res = await getClient().models.generateContent({
      model: "gemini-2.5-pro",
      contents: diff
    });

    return res.text;
  } catch (error) {
    console.warn("Gemini provider failed:", error);
    return "Gemini provider is currently unavailable. Please try another provider or configure GEMINI_API_KEY.";
  }
}
