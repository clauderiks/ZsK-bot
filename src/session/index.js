import { SignJWT,jwtVerify } from "jose";

const secret=new TextEncoder().encode(
process.env.JWT_SECRET||"zsk-secret"
);

export async function createToken(user){
return await new SignJWT(user)
.setProtectedHeader({alg:"HS256"})
.setIssuedAt()
.setExpirationTime("7d")
.sign(secret);
}

export async function verifyToken(token){
const {payload}=await jwtVerify(token,secret);
return payload;
}
