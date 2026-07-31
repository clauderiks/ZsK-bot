const cache=new Map();

export function get(k){
return cache.get(k);
}

export function set(k,v){
cache.set(k,v);
}

export function has(k){
return cache.has(k);
}

export function clear(){
cache.clear();
}
