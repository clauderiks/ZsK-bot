import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey:process.env.ANTHROPIC_API_KEY
});

export async function claudeProvider(diff){
  const res = await client.messages.create({
    model:"claude-sonnet-4",
    max_tokens:4096,
    messages:[
      {
        role:"user",
        content:diff
      }
    ]
  });

  return res.content[0].text;
}
