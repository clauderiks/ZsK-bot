<div style="font-family:'IBM Plex Sans',sans-serif;background:#050B14;color:#E2E8F0;padding:28px;max-width:900px;margin:auto;border:1px solid #1F2937;">
  <h1 style="margin-top:0;">Architecture</h1>
  <p style="color:#94A3B8;">Structure overview in a minimalist square format, with IBM-dark themed panels and RFC-level clarity.</p>

  <div style="padding:18px;background:#08101D;border:1px solid #1F2937;margin-top:20px;">
    <h2 style="margin:0 0 12px 0;">Core components</h2>
    <ul style="margin:0;padding-left:20px;color:#CBD5E1;">
      <li><code style="background:#09121F;color:#E2E8F0;padding:2px 4px;border:1px solid #1E293B;">src/</code> - React frontend + shared backend logic</li>
      <li><code style="background:#09121F;color:#E2E8F0;padding:2px 4px;border:1px solid #1E293B;">src/server/</code> - Express API server</li>
      <li><code style="background:#09121F;color:#E2E8F0;padding:2px 4px;border:1px solid #1E293B;">src/routes/chat.js</code> - chat router</li>
      <li><code style="background:#09121F;color:#E2E8F0;padding:2px 4px;border:1px solid #1E293B;">src/providers/</code> - provider adapters</li>
      <li><code style="background:#09121F;color:#E2E8F0;padding:2px 4px;border:1px solid #1E293B;">src/ohmaba/</code> - local free agent demo logic</li>
      <li><code style="background:#09121F;color:#E2E8F0;padding:2px 4px;border:1px solid #1E293B;">api/chat.js</code> - Vercel serverless endpoint</li>
      <li><code style="background:#09121F;color:#E2E8F0;padding:2px 4px;border:1px solid #1E293B;">vercel.json</code> - route + build config</li>
    </ul>
  </div>

  <div style="padding:18px;background:#08101D;border:1px solid #1F2937;margin-top:20px;">
    <h2 style="margin:0 0 12px 0;">Chat flow</h2>
    <ol style="margin:0;padding-left:20px;color:#CBD5E1;">
      <li>User sends chat request.</li>
      <li>Frontend calls <code style="background:#09121F;color:#E2E8F0;padding:2px 4px;border:1px solid #1E293B;">/api/chat</code>.</li>
      <li>Backend selects provider by <code style="background:#09121F;color:#E2E8F0;padding:2px 4px;border:1px solid #1E293B;">model</code>.</li>
      <li>Provider adapter returns AI response.</li>
      <li>Response returns to frontend.</li>
    </ol>
  </div>
</div>
