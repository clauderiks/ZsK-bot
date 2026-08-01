import { router } from '../src/router/index.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const prompt = req.body.message || req.body.prompt || '';
    const provider = req.body.model || process.env.DEFAULT_MODEL || 'zsk';

    if (!prompt) {
      return res.status(400).json({ success: false, error: 'Missing prompt/message' });
    }

    const response = await router(prompt, provider);
    return res.status(200).json({ success: true, response });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    });
  }
}
