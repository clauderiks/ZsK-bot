import { generateFreeAgentResponse } from "../ohmaba/localAgent.js";

export async function zskProvider(prompt){
  return generateFreeAgentResponse(prompt);
}
