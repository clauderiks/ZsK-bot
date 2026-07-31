import { appendFileSync } from "node:fs";

export function log(type,message){

appendFileSync(
"zsk.log",
`[${new Date().toISOString()}] ${type}: ${message}\n`
);

}
