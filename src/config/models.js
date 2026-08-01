export default {
  default: process.env.DEFAULT_MODEL || "openai",
  providers: {
    openai: !!process.env.OPENAI_API_KEY,
    claude: !!process.env.ANTHROPIC_API_KEY,
    gemini: !!process.env.GEMINI_API_KEY,
    qwen: !!process.env.QWEN_API_KEY,
    ohmaba: !!process.env.OHMABA_URL,
    zsk: true
  }
}
