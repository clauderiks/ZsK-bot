import { Router } from "express";
import { router as ai } from "../router/index.js";
import { db } from "../db/database.js";

const r = Router();

const insert = db.prepare(`
INSERT INTO chats(provider,prompt,response)
VALUES(?,?,?)
`);

const history = db.prepare(`
SELECT *
FROM chats
ORDER BY id DESC
LIMIT 100
`);

r.post("/", async (req, res) => {
  const prompt = req.body.message;
  const provider = req.body.model || process.env.DEFAULT_MODEL;

  const response = await ai(prompt, provider);

  insert.run(
    provider,
    prompt,
    response
  );

  res.json({
    success: true,
    response
  });
});

r.get("/history", (req, res) => {
  res.json(history.all());
});

export default r;
