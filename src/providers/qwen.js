import { QwenCode } from "@qwen-code/qwen-code";

const client = new QwenCode({
  apiKey: process.env.QWEN_API_KEY
});

export async function qwenProvider(diff) {
  const res = await client.responses.create({
    model: "qwen3-coder-plus",
    input: diff
  });

  return res.output_text;
}
