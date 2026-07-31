export function createPlan(prompt){

return[
{
id:1,
agent:"review",
task:"Review code"
},
{
id:2,
agent:"security",
task:"Check vulnerabilities"
},
{
id:3,
agent:"performance",
task:"Optimize performance"
},
{
id:4,
agent:"architecture",
task:"Review architecture"
}
];

}
