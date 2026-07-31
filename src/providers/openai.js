import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function openaiProvider(diff){
  const res = await client.responses.create({
    model:"gpt-5",
    input:diff
  });

  return res.output_text;
}
