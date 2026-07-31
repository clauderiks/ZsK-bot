import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { router } from "../router/index.js";

const app=express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(express.json());

app.get("/health",(req,res)=>{
  res.json({status:"ok"});
});

app.post("/chat",async(req,res)=>{
  const result=await router(req.body.message);
  res.json({result});
});

const port=process.env.PORT||3000;

app.listen(port,()=>{
  console.log("API running on",port);
});
