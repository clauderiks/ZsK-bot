import "dotenv/config";
import "./config/plugins.js";
const cmd=process.argv[2]||"review";

if(cmd==="chat"){
  await import("./cli/chat.js");
}else{
  const {runReview}=await import("./core/app.js");
  await runReview();
}
