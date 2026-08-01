let client = null;

function getClient() {
  if (client) return client;

  if (!process.env.QWEN_API_KEY) {
    throw new Error("QWEN_API_KEY not configured");
  }

  return null;
}

export async function qwenProvider(prompt) {
  try {
    const QwenCode = (await import("@qwen-code/qwen-code")).QwenCode;

    if (!QwenCode || typeof QwenCode !== "function") {
      throw new Error("Qwen SDK export is unavailable");
    }

    const apiKey = process.env.QWEN_API_KEY;
    if (!apiKey) {
      return "Qwen provider is configured as a local fallback only. Add QWEN_API_KEY to enable the live model.";
    }

    if (!client) {
      client = new QwenCode({ apiKey });
    }

    const res = await client.responses.create({
      model: "qwen3-coder-plus",
      input: prompt
    });

    return res?.output_text || "No response returned.";
  } catch (error) {
    console.warn("Qwen provider unavailable, using fallback response:", error);
    return "Qwen provider is currently unavailable. Please switch to another provider or configure QWEN_API_KEY.";
  }
}
