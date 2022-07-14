import { Dimension, Scoreboard, ScoreboardIdentity, ScoreboardObjective, world } from "mojang-minecraft";

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
const GetScorePartic    = (...args: { getParticipants: () => ScoreboardIdentity[]; }[]) =>{return  args.length ? args[0].getParticipants() : GetScoreBoard.getParticipants()};
// @ts-ignore
const AssScoreObject    = (ObjName: string)=>{return  GetScoreObject().find((scoreboard : { id: string; })=>{if(scoreboard .id === ObjName)return true})};
// @ts-ignore
const AssScorePartic    = (...args: string[])=>{return args.length === 2 ? args[1].getParticipants().find((participant: { displayName: string; })=>{if(participant.displayName === args[0])return true}) : GetScorePartic().find((participant: { displayName: string; })=>{if(participant.displayName === args[0])return true})};


// /scoreboard objectives remove testObjectName
///scoreboard objectives add testObjectName dummy ss
const DelScoreObjectAsync    = (ObjName: string)=>{return overworld.runCommandAsync(`scoreboard objectives remove ${ObjName}`)};
const NewScoreObjectAsync    = (...args: string[])=>{return overworld.runCommandAsync(`scoreboard objectives add ${args[0]} ${args[2]||"dummy"} ${args[1]}`)};

const DelScoreObject    = (ObjName: string)=>{overworld.runCommand(`scoreboard objectives remove ${ObjName}`)};
const NewScoreObject    = (...args: string[])=>{overworld.runCommand(`scoreboard objectives add ${args[0]} ${args[2]||"dummy"} ${args[1]}`)};
const DisScoreObject    = (...args: string[])=>{overworld.runCommand(`scoreboard objectives setdisplay ${args[0]} ${args[1]+args[2]?(" "+args[2]):""}`)};



///scoreboard players add "Xboy minemc" testObjectName 3
const AddScorePointsAsync    = (...args: string[])=>{overworld.runCommandAsync(`scoreboard players add ${args[0]} ${args[1]}`)};
const SetScorePointsAsync    = (...args: string[])=>{overworld.runCommandAsync(`scoreboard players set ${args[0]} ${args[1]}`)};

const AddScorePoints    = (...args: string[])=>{overworld.runCommand(`scoreboard players add ${args[0]} ${args[1]}`)};
const SetScorePoints    = (...args: string[])=>{overworld.runCommand(`scoreboard players set ${args[0]} ${args[1]}`)};



const ScoreBase = {
        GetObject : GetScoreObject,
        GetPartic : GetScorePartic,
        AssObject : AssScoreObject,
        AssPartic : AssScorePartic,
        DelObjectAsync : DelScoreObjectAsync,
        NewObjectAsync : NewScoreObjectAsync,
        DelObject : DelScoreObject,
        NewObject : NewScoreObject,
        DisObject : DisScoreObject,
        AddPointsAsync : AddScorePointsAsync,
        SetPointsAsync : SetScorePointsAsync,
        AddPoints : AddScorePoints,
        SetPoints : SetScorePoints
}
export default ScoreBase;

// const ScoreBase = {
//     GetScoreObject : GetScoreObject,
//     GetScorePartic : GetScorePartic,
//     AssScoreObject : AssScoreObject,
//     AssScorePartic : AssScorePartic,
//     DelScoreObjectAsync : DelScoreObjectAsync,
//     NewScoreObjectAsync : NewScoreObjectAsync,
//     DelScoreObject : DelScoreObject,
//     NewScoreObject : NewScoreObject,
//     DisScoreObject : DisScoreObject,
//     AddScorePointsAsync : AddScorePointsAsync,
//     SetScorePointsAsync : SetScorePointsAsync,
//     AddScorePoints : AddScorePoints,
//     SetScorePoints : SetScorePoints
// }