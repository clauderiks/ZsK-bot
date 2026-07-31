const docs=[];

export function add(id,vector,text){
docs.push({id,vector,text});
}

function cosine(a,b){

let dot=0;
let na=0;
let nb=0;

for(let i=0;i<a.length;i++){
dot+=a[i]*b[i];
na+=a[i]*a[i];
nb+=b[i]*b[i];
}

return dot/(Math.sqrt(na)*Math.sqrt(nb));

}

export function search(vector,k=5){

return docs
.map(d=>({
...d,
score:cosine(vector,d.vector)
}))
.sort((a,b)=>b.score-a.score)
.slice(0,k);

}
