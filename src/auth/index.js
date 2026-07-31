import argon2 from "argon2";
import { addUser,getUser } from "../users/store.js";

export async function register(username,password){
const hash=await argon2.hash(password);
addUser(username,hash);
}

export async function login(username,password){
const user=getUser(username);

if(!user) return false;

return await argon2.verify(user.password,password);
}
