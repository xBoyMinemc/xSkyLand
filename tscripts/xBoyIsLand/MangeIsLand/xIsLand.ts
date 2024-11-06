import { ScoreboardObjective,ScoreboardScoreInfo, world } from "@minecraft/server";
import ScoreBase from "../../lib/xboyTools/scoreBase/rw";


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

    const xIsLandObject : ScoreboardObjective = ScoreBase.AssObject("##xSky##"+(String(UID)))
    // console.log(xIsLandObject)
    if (!xIsLandObject) return -3;
    const player = Array.from(xIsLandObject.getScores()).find((_ : ScoreboardScoreInfo)=> _.participant.displayName == playerName);
    if (!player) return -3;
    return player.score;
    
}
const SetIsPlayerScore = (playerName : string,score : number) : boolean =>{
    if (typeof playerName !== "string" || typeof score !== "number")return false;

        ScoreBase.SetPointsAsync(playerName,"##xSkyPlayers##",score)
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

    const landName = "##xSky##"+(String(UID));
    if (AssIsLand("##xSky##"+(String(UID))))return 0;
    

    ScoreBase.AddPointsAsync("##xSkyLands##currentUID","##xSkyConfigs##",1);

    world.getDimension('overworld').runCommandAsync(`me  ${landName}`)

    ScoreBase.NewObjectAsync(landName,landName);//为每一个岛新建一个计分板
    ScoreBase.SetPointsAsync(name,landName,777); //设置岛屿名称
    ScoreBase.SetPointsAsync("UID",landName,UID);//设置岛屿UID
    ScoreBase.SetPointsAsync(owner,landName,7);//设置岛屿中，玩家的岛屿最高管理权
    // ScoreBase.SetPointsAsync(xStrParer(owner),xStrParer(name),String(8));


    ScoreBase.SetPointsAsync(owner,"##xSkyPlayers##",UID);//设置玩家清单中，玩家的岛屿归属
    return 1;
}

const xIsLand = {
    NewIsLand : NewIsLand,
    GetIsPlayerInIsLandScore : GetIsPlayerInIsLandScore,
    GetIsPlayerScore : GetIsPlayerScore,
} 

export default xIsLand;


