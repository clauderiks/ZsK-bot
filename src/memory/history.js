const history=[];

export function add(role,content){
  history.push({role,content});
}

export function messages(){
  return history;
}

export function clear(){
  history.length=0;
}
