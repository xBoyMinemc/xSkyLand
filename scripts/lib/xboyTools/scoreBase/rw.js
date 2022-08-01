import { world } from "mojang-minecraft";
const overworld = world.getDimension("overworld");
//#=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
//https://github.com/xBoyMinemc/xSkyLand/blob/main/tscripts/lib/xboyTools/scoreBase/rw.ts
//#+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
// let xboy;
// xboy = world.scoreboard.getObjective("testObjectName")
// console.log(xboy)
// xboy = world.scoreboard.getObjectives()
// console.log(xboy)
// xboy = world.scoreboard.getParticipants()
// console.log(xboy[1].displayName)
const GetScoreBoard = world.scoreboard;
const GetScoreObject = (...args) => { return args.length ? GetScoreBoard.getObjective(args[0]) : GetScoreBoard.getObjectives(); };
const GetScorePartic = (...args) => { return args.length ? args[0].getParticipants() : GetScoreBoard.getParticipants(); };
// @ts-ignore
const GetScorePoints = (object, partic) => { return Array.from(((typeof object == "string") ? GetScoreObject(object) : object).getScores()).find((_) => _.participant.displayName == partic).score; };
// @ts-ignore
const AssScoreObject = (ObjName) => { return GetScoreObject().find((scoreboard) => { if (scoreboard.id === ObjName)
    return true; }); };
// @ts-ignore
const AssScorePartic = (...args) => { return args.length === 2 ? args[1].getParticipants().find((participant) => { if (participant.displayName === args[0])
    return true; }) : GetScorePartic().find((participant) => { if (participant.displayName === args[0])
    return true; }); };
///scoreboard objectives remove testObjectName
///scoreboard objectives add testObjectName dummy ss
const DelScoreObjectAsync = (ObjName) => { return overworld.runCommandAsync(`scoreboard objectives remove ${(typeof ObjName === typeof "xBoyMinemc") ? ObjName : ObjName.id}`); };
const NewScoreObjectAsync = (...args) => { return overworld.runCommandAsync(`scoreboard objectives add ${args[0]} ${args[2] || "dummy"} ${args[1]}`); };
const DelScoreObject = (ObjName) => { overworld.runCommand(`scoreboard objectives remove ${(typeof ObjName === typeof "xBoyMinemc") ? ObjName : ObjName.id}`); };
const NewScoreObject = (...args) => { overworld.runCommand(`scoreboard objectives add ${args[0]} ${args[2] || "dummy"} ${args[1]}`); };
///scoreboard objectives setdisplay list ScoreName ascending
const DisScoreObject = (...args) => { overworld.runCommand(`scoreboard objectives setdisplay ${(typeof args[0] === typeof 520) ? ['list', 'sidebar', 'belowname'][args[0]] : args[0]} ${((typeof args[1] === typeof "云梦") ? args[1] : args[1].id) + (args[2] ? (" " + (typeof args[2] === "string" ? args[2] : ['ascending', 'descending'][args[2]])) : "")}`); };
///scoreboard players add "Xboy minemc" testObjectName 3
const AddScorePointsAsync = (...args) => { overworld.runCommandAsync(`scoreboard players add ${args[0].name ? ('"' + args[0].name + '"') : (args[0].includes('"') ? args[0] : ('"' + args[0] + '"'))} ${(typeof args[1] === typeof "Xboy minemc") ? args[1] : ('"' + args[1].id + '"')} ${args[2]}`); };
const SetScorePointsAsync = (...args) => { overworld.runCommandAsync(`scoreboard players set ${args[0].name ? ('"' + args[0].name + '"') : (args[0].includes('"') ? args[0] : ('"' + args[0] + '"'))} ${(typeof args[1] === typeof "Xboy minemc") ? args[1] : ('"' + args[1].id + '"')} ${args[2]}`); };
const AddScorePoints = (...args) => { overworld.runCommand(`scoreboard players add ${args[0].name ? ('"' + args[0].name + '"') : (args[0].includes('"') ? args[0] : ('"' + args[0] + '"'))} ${(typeof args[1] === typeof "Xboy minemc") ? args[1] : ('"' + args[1].id + '"')} ${args[2]}`); };
const SetScorePoints = (...args) => { overworld.runCommand(`scoreboard players set ${args[0].name ? ('"' + args[0].name + '"') : (args[0].includes('"') ? args[0] : ('"' + args[0] + '"'))} ${(typeof args[1] === typeof "Xboy minemc") ? args[1] : ('"' + args[1].id + '"')} ${args[2]}`); };
const ScoreBase = {
    GetObject: GetScoreObject,
    GetPartic: GetScorePartic,
    GetPoints: GetScorePoints,
    AssObject: AssScoreObject,
    AssPartic: AssScorePartic,
    DelObjectAsync: DelScoreObjectAsync,
    NewObjectAsync: NewScoreObjectAsync,
    DelObject: DelScoreObject,
    NewObject: NewScoreObject,
    DisObject: DisScoreObject,
    AddPointsAsync: AddScorePointsAsync,
    SetPointsAsync: SetScorePointsAsync,
    AddPoints: AddScorePoints,
    SetPoints: SetScorePoints
};
export default ScoreBase;
// const ScoreBase = {
//     GetScoreObject : GetScoreObject,
//     GetScorePartic : GetScorePartic,
//     GetScorePoints : GetScorePoints,
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
