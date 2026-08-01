const OHMABA_URL = process.env.OHMABA_URL;
const OHMABA_API_KEY = process.env.OHMABA_API_KEY;

if(!OHMABA_URL){
  throw new Error("OHMABA_URL not configured");
}

export async function ohmabaProvider(prompt){
  const headers = {
    "Content-Type": "application/json"
  };

  if(OHMABA_API_KEY){
    headers.Authorization = `Bearer ${OHMABA_API_KEY}`;
  }

  const response = await fetch(OHMABA_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ prompt })
  });

  if(!response.ok){
    const bodyText = await response.text();
    throw new Error(`ohmabaProvider request failed ${response.status}: ${bodyText}`);
  }

  const data = await response.json();
  return data.response ?? data.output ?? data.result ?? data.text ?? data.answer ?? JSON.stringify(data);
}
