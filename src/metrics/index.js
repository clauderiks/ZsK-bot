const metrics={
requests:0,
errors:0,
tokens:0,
started:Date.now()
};

export function inc(name,value=1){
metrics[name]=(metrics[name]||0)+value;
}

export function getMetrics(){
return metrics;
}
