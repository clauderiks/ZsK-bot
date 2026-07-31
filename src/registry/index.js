const registry=new Map();

export function register(name,plugin){
registry.set(name,plugin);
}

export function get(name){
return registry.get(name);
}

export function all(){
return [...registry.entries()];
}
