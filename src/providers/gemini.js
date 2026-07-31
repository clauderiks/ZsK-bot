import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export async function geminiProvider(diff) {
  const res = await client.models.generateContent({
    model: "gemini-2.5-pro",
    contents: diff
  });

  return res.text;
}
