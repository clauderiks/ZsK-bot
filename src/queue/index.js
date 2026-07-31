const queue=[];

export function add(task){
queue.push(task);
}

export function next(){
return queue.shift();
}

export function size(){
return queue.length;
}

export function clear(){
queue.length=0;
}
