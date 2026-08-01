<div style="font-family:'IBM Plex Sans',sans-serif;background:#050B14;color:#E2E8F0;padding:28px;max-width:900px;margin:auto;border:1px solid #1F2937;">
  <h1 style="margin-top:0;">Installation</h1>
  <p style="color:#94A3B8;">Follow these square-edge setup steps for local development. The layout is intentionally minimal and structured for quick reference.</p>

  <section style="padding:18px;background:#09101D;border:1px solid #1F2937;margin-top:20px;">
    <h2 style="margin:0 0 10px 0;">Prerequisites</h2>
    <ul style="margin:0;padding-left:20px;color:#CBD5E1;">
      <li>Node.js >= 18</li>
      <li>npm or yarn</li>
    </ul>
  </section>

  <section style="padding:18px;background:#09101D;border:1px solid #1F2937;margin-top:20px;">
    <h2 style="margin:0 0 10px 0;">Install</h2>
    <pre style="background:#08121F;color:#E2E8F0;padding:16px;border:1px solid #1F2937;overflow:auto;">git clone https://github.com/clauderiks/ZsK-bot.git
cd ZsK-bot
npm install
cp .env.example .env</pre>
  </section>

  <section style="padding:18px;background:#09101D;border:1px solid #1F2937;margin-top:20px;">
    <h2 style="margin:0 0 10px 0;">Run locally</h2>
    <pre style="background:#08121F;color:#E2E8F0;padding:16px;border:1px solid #1F2937;overflow:auto;">npm run api
npm run dev</pre>
    <p style="margin:12px 0 0;color:#94A3B8;">Or use npx:</p>
    <pre style="background:#08121F;color:#E2E8F0;padding:16px;border:1px solid #1F2937;overflow:auto;">npx vite
npx node src/server/index.js</pre>
  </section>

  <section style="padding:18px;background:#09101D;border:1px solid #1F2937;margin-top:20px;">
    <h2 style="margin:0 0 10px 0;">Concurrent</h2>
    <pre style="background:#08121F;color:#E2E8F0;padding:16px;border:1px solid #1F2937;overflow:auto;">npx concurrently "npm run api" "npm run dev"</pre>
  </section>
</div>
