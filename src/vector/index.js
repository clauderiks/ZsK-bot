const docs=[];

export function add(id,vector,text){
  docs.push({id,vector,text});
}

export function search(query){
  return docs.filter(d=>d.text.includes(query)).slice(0,5);
}
