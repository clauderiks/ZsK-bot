import express from "express";
import { createServer } from "node:http";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { router } from "../router/index.js";
import { health } from "../health/index.js";
import chatRoutes from "../routes/chat.js";
import { createSocket } from "../ws/server.js";

const app=express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(express.json());
app.use("/v1/chat",chatRoutes);

app.get("/health",(req,res)=>{
  res.json(health());
});

app.post("/chat",async(req,res)=>{
  const result=await router(req.body.message);
  res.json({result});
});

const port=process.env.PORT||3000;

const server=createServer(app);
createSocket(server);

server.listen(port,()=>{
  console.log("API running on",port);
});
