import { Dimension, Entity, Scoreboard, ScoreboardIdentity, ScoreboardObjective, world } from "@minecraft/server";

const overworld : Dimension = world.getDimension("overworld");
// let xboy;

// xboy = world.scoreboard.getObjective("testObjectName")
// console.log(xboy)

// xboy = world.scoreboard.getObjectives()
// console.log(xboy)

// xboy = world.scoreboard.getParticipants()
// console.log(xboy[1].displayName)



const GetScoreBoard    : Scoreboard = world.scoreboard;
const GetScoreObject    = (...args: string[]) : ScoreboardObjective|ScoreboardObjective[] =>{return  args.length ? GetScoreBoard.getObjective(args[0])    : GetScoreBoard.getObjectives()};
const GetScorePartic    = (args: Entity & ScoreboardObjective ) : Entity|ScoreboardIdentity[]=>{return  args ? (args.dimension?Array.from(GetScoreBoard.getParticipants()).find(Participant=>Participant.getEntity()==args):args[0].getParticipants()) : GetScoreBoard.getParticipants()};
// @ts-ignore
const GetScorePoints    = (object : ScoreboardObjective|string,partic: string) : number => {return  Array.from(((typeof object == "string" ) ? GetScoreObject(object) : object).getScores()).find((_)=>_.participant.displayName == partic).score}

// @ts-ignore
const AssScoreObject    = (ObjName: string) : ScoreboardObjective|undefined=>{return  GetScoreObject().find((scoreboard : { id: string; })=>{if(scoreboard .id === ObjName)return true})};
// @ts-ignore
const AssScorePartic    = (...args: any[])=>{return args.length === 2 ? args[1].getParticipants().find((participant: { displayName: string; })=>{if(participant.displayName === args[0])return true}) : GetScorePartic().find((participant: { displayName: string; })=>{if(participant.displayName === args[0])return true})};


///scoreboard objectives remove testObjectName
///scoreboard objectives add testObjectName dummy ss
// const DelScoreObjectAsync    = (ObjName: string | ScoreboardObjective)=>{return overworld.runCommandAsync(`scoreboard objectives remove ${(typeof ObjName === typeof "xBoyMinemc") ? ObjName : ObjName.id}`)};
// const NewScoreObjectAsync    = (...args: string[])=>{return overworld.runCommandAsync(`scoreboard objectives addx'x'x'x'x'x'x'x'x'x'x'x'x'x'x'x'x'x'x ${args[0]} ${args[2]||"dummy"} ${args[1]}`)};

// @ts-ignore
const DelScoreObject    = (ObjName: string | ScoreboardObjective)=>{overworld.runCommandAsync(`scoreboard objectives remove ${(typeof ObjName === typeof "xBoyMinemc") ? ObjName : ObjName.id}`)};
const NewScoreObject    = (...args: string[])=>{overworld.runCommandAsync(`scoreboard objectives add ${args[0]} ${args[2]||"dummy"} ${args[1]}`)};
///scoreboard objectives setdisplay list ScoreName ascending
// @ts-ignore
const DisScoreObject    = (...args: string[])=>{overworld.runCommandAsync(`scoreboard objectives setdisplay ${(typeof args[0] === typeof 520) ? ['list','sidebar','belowname'][args[0]] : args[0]} ${((typeof args[1] === typeof "云梦") ? args[1] : args[1].id)+(args[2]?(" "+(typeof args[2] === "string" ? args[2] : ['ascending','descending'][args[2]])):"")}`)};



///scoreboard players add "Xboy minemc" testObjectName 3
// const AddScorePointsAsync    = (...args: (string & Entity)[])=>{overworld.runCommandAsync(`scoreboard players add ${args[0].name ? ('"'+ args[0].name +'"') : (args[0].includes('"') ? args[0] : ('"'+args[0]+'"'))} ${(typeof args[1] === typeof "Xboy minemc")?args[1]:('"'+args[1].id+'"')} ${args[2]}`)};
// const SetScorePointsAsync    = (...args: string[])=>{overworld.runCommandAsync(`scoreboard players set ${args[0].name ? ('"'+ args[0].name +'"') : (args[0].includes('"') ? args[0] : ('"'+args[0]+'"'))} ${(typeof args[1] === typeof "Xboy minemc")?args[1]:('"'+args[1].id+'"')} ${args[2]}`)};

// @ts-ignore
const AddScorePoints    = (...args: string[])=>{overworld.runCommandAsync(`scoreboard players add ${args[0].name ? ('"'+ args[0].name +'"') : (args[0].includes('"') ? args[0] : ('"'+args[0]+'"'))} ${(typeof args[1] === typeof "Xboy minemc")?args[1]:('"'+args[1].id+'"')} ${args[2]}`)};
// @ts-ignore
const SetScorePoints    = (...args: string[])=>{overworld.runCommandAsync(`scoreboard players set ${args[0].name ? ('"'+ args[0].name +'"') : (args[0].includes('"') ? args[0] : ('"'+args[0]+'"'))} ${(typeof args[1] === typeof "Xboy minemc")?args[1]:('"'+args[1].id+'"')} ${args[2]}`)};



const ScoreBase = {
        GetObject : GetScoreObject,
        GetPartic : GetScorePartic,
        GetPoints : GetScorePoints,
        AssObject : AssScoreObject,
        AssPartic : AssScorePartic,
        DelObjectAsync : DelScoreObject,
        NewObjectAsync : NewScoreObject,
        DelObject : DelScoreObject,
        NewObject : NewScoreObject,
        DisObject : DisScoreObject,
        AddPointsAsync : AddScorePoints,
        SetPointsAsync : SetScorePoints,
        AddPoints : AddScorePoints,
        SetPoints : SetScorePoints
}
export default ScoreBase;

// const ScoreBase = {
//     GetScoreObject : GetScoreObject,
//     GetScorePartic : GetScorePartic,
//     GetScorePoints : GetScorePoints,
//     AssScoreObject : AssScoreObject,
//     AssScorePartic : AssScorePartic,
//     DelScoreObjectAsync : DelScoreObject,
//     NewScoreObjectAsync : NewScoreObject,
//     DelScoreObject : DelScoreObject,
//     NewScoreObject : NewScoreObject,
//     DisScoreObject : DisScoreObject,
//     AddScorePointsAsync : AddScorePoints,
//     SetScorePointsAsync : SetScorePoints,
//     AddScorePoints : AddScorePoints,
//     SetScorePoints : SetScorePoints
// }
