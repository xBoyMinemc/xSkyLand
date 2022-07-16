import { ScoreboardObjective,ScoreboardScoreInfo } from "mojang-minecraft";
import ScoreBase from "../../lib/xboyTools/scoreBase/rw";

const StrParer  = (str : string) : string => '"'+str+'"';
const xStrParer = (str : string) : string => '"##xSkyLand##'+str+'"';

const AssIsPlayer = (playerName : string) : boolean =>{
    if (typeof playerName !== "string")return false;

    const xIsLandObject : ScoreboardObjective = ScoreBase.AssObject("##xSkyPlayers##")
    if (!xIsLandObject) return false
    if (!Array.from(xIsLandObject.getScores()).find((_)=> _.participant.displayName == playerName)) return false
                                                                                                    return true
    
}

const GetIsPlayerScore = (playerName : string) : number =>{
    if (typeof playerName !== "string")return -1;

    const xIsLandObject : ScoreboardObjective = ScoreBase.AssObject("##xSkyPlayers##")
    if (!xIsLandObject) return -1
    return Array.from(xIsLandObject.getScores()).find((_)=> _.participant.displayName == playerName).score
    
}
const SetIsPlayerScore = (playerName : string,score : number) : boolean =>{
    if (typeof playerName !== "string" || typeof score !== "number")return false;

        ScoreBase.SetPointsAsync(playerName,StrParer("##xSkyPlayers##"),String(score))
        return true
    
}

const AssIsLand = (IdOrName : number|string) : boolean|ScoreboardObjective =>{
    if (typeof IdOrName == "number" || /^[1-9]/.test(IdOrName)){
        IdOrName = Number(IdOrName)
        // @ts-ignore
        const xIsLand : ScoreboardScoreInfo  = Array.from(ScoreBase.GetObject("##xSkyLands##").getScores()).find((_ : ScoreboardScoreInfo)=>{return _.score === IdOrName})
        if (!xIsLand) return false
        const xIsLandObject : ScoreboardObjective = ScoreBase.AssObject(xIsLand.participant.displayName)
        if (!xIsLandObject) return false
                            return xIsLandObject

    }else{
        const xIsLandObject : ScoreboardObjective = ScoreBase.AssObject(IdOrName)
        if (!xIsLandObject) return false
                            return xIsLandObject
    }
}


const NewIsLand = (name : string, owner : string) : number =>{
    if (AssIsLand(name))return 0

    const UID : number = ScoreBase.GetPoints(xStrParer("currentUID"),xStrParer("currentUID"));
    ScoreBase.AddPointsAsync(xStrParer("currentUID"),xStrParer("currentUID"),"1")
    ScoreBase.NewObjectAsync(xStrParer(name),xStrParer(name),"dummy")
    ScoreBase.SetPointsAsync(xStrParer("UID"),xStrParer(name),String(UID))
    // ScoreBase.SetPointsAsync(xStrParer(owner),xStrParer(name),String(8))
    ScoreBase.SetPointsAsync(StrParer(owner),StrParer("##xSkyPlayers##"),String(8))
    
}




