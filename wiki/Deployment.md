# Deployment

## Deploy lên Vercel

1. Đảm bảo `vercel.json` đã có sẵn trong repo.
2. Thiết lập environment variables:
   - `DEFAULT_MODEL`
   - `OHMABA_URL`
   - `OHMABA_API_KEY`
   - `GEMINI_API_KEY`
3. Deploy:

```bash
vercel --prod
```

## Hugging Face Space

Mẫu demo có sẵn trong thư mục `huggingface-space-kimi-demo/`.

1. Tạo Space mới trên Hugging Face.
2. Đẩy nội dung của thư mục `huggingface-space-kimi-demo` lên Space.
3. Thiết lập `HF_TOKEN` nếu cần.
