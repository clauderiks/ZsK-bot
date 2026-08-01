# Deployment

## Vercel

1. Ensure `vercel.json` exists in the repository.
2. Configure environment variables:
   - `DEFAULT_MODEL`
   - `OHMABA_URL`
   - `OHMABA_API_KEY`
   - `GEMINI_API_KEY`
3. Deploy with:

```bash
vercel --prod
```

## Hugging Face Space

A demo Space exists at `huggingface-space-kimi-demo/` and uses `app.py` with Gradio.

To deploy:
1. Create a new Space on Hugging Face.
2. Push the `huggingface-space-kimi-demo` folder contents.
3. Add `HF_TOKEN` as a secret if required.
