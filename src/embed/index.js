import { openaiProvider } from "../providers/openai.js";

export async function embedding(text){
  return await openaiProvider(
    `Return ONLY a JSON array of 256 embedding numbers for:\n${text}`
  );
}
