import { Router } from "express";
import { router as ai } from "../router/index.js";
import { db } from "../db/database.js";

const r=Router();

r.post("/",async(req,res)=>{

const prompt=req.body.message;

const response=await ai(prompt);

db.run(
"INSERT INTO chats(provider,prompt,response) VALUES(?,?,?)",
[
process.env.DEFAULT_MODEL,
prompt,
response
]
);

res.json({
success:true,
response
});

});

export default r;
