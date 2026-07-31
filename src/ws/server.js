import { Server } from "socket.io";
import { bus } from "../events/bus.js";

export function createSocket(httpServer){

const io=new Server(httpServer,{
cors:{origin:"*"}
});

io.on("connection",(socket)=>{

socket.emit("connected",{
status:"ok"
});

});

bus.on("ai",msg=>{
io.emit("ai",msg);
});

return io;

}
