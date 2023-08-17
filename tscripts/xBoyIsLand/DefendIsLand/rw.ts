import { ScoreboardObjective,ScoreboardScoreInfo, world } from "@minecraft/server";
import ScoreBase from "../../lib/xboyTools/scoreBase/rw";

const aStrParer = (str : string) : string => '##xSky##'+str+'';

const GetIsPlayerScore = (playerName : string) : number =>{
    if (typeof playerName !== "string")return -3;

    const xIsLandObject : ScoreboardObjective = ScoreBase.AssObject("##xSkyPlayers##")
    // console.log(xIsLandObject)
    if (!xIsLandObject) return -3;
    const player = Array.from(xIsLandObject.getScores()).find((_ : ScoreboardScoreInfo)=> _.participant.displayName == playerName);
    if (!player) return -3;
    return player.score;
    
}

const GetIsPlayerInIsLandScore = (playerName : string,UID : number) : number =>{
    if (typeof playerName !== "string")return -3;

    const xIsLandObject : ScoreboardObjective = ScoreBase.AssObject(aStrParer(String(UID)))
    // console.log(xIsLandObject)
    if (!xIsLandObject) return -3;
    const player = Array.from(xIsLandObject.getScores()).find((_ : ScoreboardScoreInfo)=> _.participant.displayName == playerName);
    if (!player) return -3;
    return player.score;
    
}
// const GetIsPlayerPos = (playerName : string) : number =>{
//     if (typeof playerName !== "string")return -3;

//     const xIsLandObject : ScoreboardObjective = ScoreBase.AssObject("##xSkyPlayers##")
//     // console.log(xIsLandObject)
//     if (!xIsLandObject) return -3;
//     const player = Array.from(xIsLandObject.getScores()).find((_ : ScoreboardScoreInfo)=> _.participant.displayName == playerName);
//     if (!player) return -3;
//     return player.score;
    
// }

export {GetIsPlayerScore,GetIsPlayerInIsLandScore};