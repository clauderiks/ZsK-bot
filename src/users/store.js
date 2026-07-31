const users=new Map();

export function addUser(username,password){
users.set(username,{username,password});
}

export function getUser(username){
return users.get(username);
}
