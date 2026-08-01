<div style="font-family:'IBM Plex Sans',sans-serif;background:#050B14;color:#E2E8F0;padding:28px;max-width:900px;margin:auto;border:1px solid #1F2937;">
  <h1 style="margin-top:0;">Deployment</h1>
  <p style="color:#94A3B8;">Deploy instructions in a minimalist square-card style with dark IBM-inspired surfaces.</p>

  <section style="padding:18px;background:#09101D;border:1px solid #1F2937;margin-top:20px;">
    <h2 style="margin:0 0 10px 0;">Vercel</h2>
    <ol style="margin:0;padding-left:20px;color:#CBD5E1;">
      <li>Ensure <code style="background:#08121F;color:#E2E8F0;padding:2px 4px;border:1px solid #1E293B;">vercel.json</code> exists.</li>
      <li>Set environment variables:</li>
    </ol>
    <ul style="margin:8px 0 0 20px;color:#CBD5E1;">
      <li><code style="background:#08121F;color:#E2E8F0;padding:2px 4px;border:1px solid #1E293B;">DEFAULT_MODEL</code></li>
      <li><code style="background:#08121F;color:#E2E8F0;padding:2px 4px;border:1px solid #1E293B;">OHMABA_URL</code></li>
      <li><code style="background:#08121F;color:#E2E8F0;padding:2px 4px;border:1px solid #1E293B;">OHMABA_API_KEY</code></li>
      <li><code style="background:#08121F;color:#E2E8F0;padding:2px 4px;border:1px solid #1E293B;">GEMINI_API_KEY</code></li>
    </ul>
    <pre style="background:#08121F;color:#E2E8F0;padding:16px;border:1px solid #1F2937;overflow:auto;margin-top:16px;">vercel --prod</pre>
  </section>

  <section style="padding:18px;background:#09101D;border:1px solid #1F2937;margin-top:20px;">
    <h2 style="margin:0 0 10px 0;">Hugging Face Space</h2>
    <p style="margin:0 0 12px 0;color:#CBD5E1;">Use the demo folder <code style="background:#08121F;color:#E2E8F0;padding:2px 4px;border:1px solid #1E293B;">huggingface-space-kimi-demo/</code>.</p>
    <ol style="margin:0;padding-left:20px;color:#CBD5E1;">
      <li>Create a new Space on Hugging Face.</li>
      <li>Push the folder contents.</li>
      <li>Add <code style="background:#08121F;color:#E2E8F0;padding:2px 4px;border:1px solid #1E293B;">HF_TOKEN</code> if required.</li>
    </ol>
  </section>
</div>
