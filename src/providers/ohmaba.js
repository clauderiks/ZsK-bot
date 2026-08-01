const OHMABA_URL = process.env.OHMABA_URL;
const OHMABA_API_KEY = process.env.OHMABA_API_KEY;

export async function ohmabaProvider(prompt) {
  if (!OHMABA_URL) {
    return "Ohmaba provider is not configured. Add OHMABA_URL to enable the custom endpoint.";
  }

  const headers = {
    "Content-Type": "application/json"
  };

  if (OHMABA_API_KEY) {
    headers.Authorization = `Bearer ${OHMABA_API_KEY}`;
  }

  try {
    const response = await fetch(OHMABA_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      const bodyText = await response.text();
      throw new Error(`ohmabaProvider request failed ${response.status}: ${bodyText}`);
    }

    const data = await response.json();
    return data.response ?? data.output ?? data.result ?? data.text ?? data.answer ?? JSON.stringify(data);
  } catch (error) {
    console.warn("Ohmaba provider failed:", error);
    return "Ohmaba provider is currently unavailable. Please try another provider.";
  }
}
