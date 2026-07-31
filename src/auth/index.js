import bcrypt from "bcryptjs";
import { addUser,getUser } from "../users/store.js";

export async function register(username,password){
const hash=await bcrypt.hash(password,10);
addUser(username,hash);
}

export async function login(username,password){
const user=getUser(username);

if(!user) return false;

return await bcrypt.compare(password,user.password);
}
