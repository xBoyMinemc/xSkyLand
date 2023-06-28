import { ScoreboardObjective,ScoreboardScoreInfo, world } from "@minecraft/server";
import ScoreBase from "../../lib/xboyTools/scoreBase/rw";

const StrParer  = (str : string) : string => '"'+str+'"';
const xStrParer = (str : string) : string => '"##xSkyLands##'+str+'"';
const yStrParer = (str : string) : string => '##xSkyLands##'+str+'';
const zStrParer = (str : string) : string => '"##xSky##'+str+'"';
const aStrParer = (str : string) : string => '##xSky##'+str+'';

const AssIsPlayer = (playerName : string) : boolean =>{
    if (typeof playerName !== "string")return false;

    const xIsLandObject : ScoreboardObjective = ScoreBase.AssObject("##xSkyPlayers##")
    if (!xIsLandObject) return false
    if (!Array.from(xIsLandObject.getScores()).find((_ : ScoreboardScoreInfo)=> _.participant.displayName == playerName)) return false
    
    return true
    
}

const GetIsPlayerScore = (playerName : string) : number =>{
    // console.log("typrof playerName",typeof playerName !== typeof "string")
    if (typeof playerName !== typeof "string")return -3;

    const xIsLandObject : ScoreboardObjective = ScoreBase.AssObject("##xSkyPlayers##")
    // console.log(xIsLandObject)
    if (!xIsLandObject) return -4;
    const player = Array.from(xIsLandObject.getScores()).find((_ : ScoreboardScoreInfo)=> _.participant.displayName == playerName);
    if (!player) return -5;
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
const SetIsPlayerScore = (playerName : string,score : number) : boolean =>{
    if (typeof playerName !== "string" || typeof score !== "number")return false;

        ScoreBase.SetPointsAsync(playerName,StrParer("##xSkyPlayers##"),String(score))
        return true
    
}

const AssIsLand = (UID : string) : boolean|ScoreboardObjective =>{
    // if (typeof IdOrName == "number" || /^[1-9]/.test(UID)){
    //     // IdOrName = Number(IdOrName)
    //     // // @ts-ignore
    //     // const xIsLand : ScoreboardScoreInfo  = Array.from(ScoreBase.GetObject("##xSkyLands##").getScores()).find((_ : ScoreboardScoreInfo)=>{return _.score === IdOrName})
    //     // if (!xIsLand) return false
    //     // const xIsLandObject : ScoreboardObjective = ScoreBase.AssObject(xIsLand.participant.displayName)
    //     // if (!xIsLandObject) return false
    //     //                     return xIsLandObject

    // }
    {
        const xIsLandObject : ScoreboardObjective = ScoreBase.AssObject(UID)
        // console.log(UID,"=>",xIsLandObject)
        if (!xIsLandObject) return false
                            return xIsLandObject
    }
}


const NewIsLand = (name : string, owner : string) : number =>{
    //    console.log(GetIsPlayerScore((owner)));
    const UID : number = ScoreBase.GetPoints("##xSkyConfigs##","##xSkyLands##currentUID");

    const landName = zStrParer(String(UID));
    if (AssIsLand(aStrParer(String(UID))))return 0;
    

    ScoreBase.AddPointsAsync(StrParer("##xSkyLands##currentUID"),StrParer("##xSkyConfigs##"),"1");

    world.getDimension('overworld').runCommandAsync(`me  ${landName}`)

    ScoreBase.NewObjectAsync(landName,landName,"dummy");//为每一个岛新建一个计分板
    ScoreBase.SetPointsAsync(StrParer(name),landName,"777"); //设置岛屿名称
    ScoreBase.SetPointsAsync(StrParer("UID"),landName,String(UID));//设置岛屿UID
    ScoreBase.SetPointsAsync(StrParer(owner),landName,String(7));//设置岛屿中，玩家的岛屿最高管理权
    // ScoreBase.SetPointsAsync(xStrParer(owner),xStrParer(name),String(8));


    ScoreBase.SetPointsAsync(StrParer(owner),StrParer("##xSkyPlayers##"),String(UID));//设置玩家清单中，玩家的岛屿归属
    return 1;
}

const xIsLand = {
    NewIsLand : NewIsLand,
    GetIsPlayerInIsLandScore : GetIsPlayerInIsLandScore,
    GetIsPlayerScore : GetIsPlayerScore,
} 

export default xIsLand;


