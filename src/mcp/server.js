import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import * as git from "../tools/git.js";

const server=new Server(
{
name:"zsk-mcp",
version:"1.0.0"
},
{
capabilities:{
tools:{}
}
}
);

server.setRequestHandler("tools/list",async()=>({
tools:[
{
name:"git_status",
description:"Git status"
},
{
name:"git_diff",
description:"Git diff"
},
{
name:"git_log",
description:"Git log"
}
]
}));

server.setRequestHandler("tools/call",async(req)=>{

switch(req.params.name){

case "git_status":
return{
content:[
{
type:"text",
text:git.status()
}
]
};

case "git_diff":
return{
content:[
{
type:"text",
text:git.diff()
}
]
};

case "git_log":
return{
content:[
{
type:"text",
text:git.log()
}
]
};

default:
throw new Error("Unknown tool");

}

});

const transport=new StdioServerTransport();

await server.connect(transport);
