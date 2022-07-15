// import { ScoreboardScoreInfo } from "mojang-minecraft";
import { ScoreboardObjective } from "mojang-minecraft";
import ScoreBase from "../../lib/xboyTools/scoreBase/rw";


const AssIsLand = (IdOrName : number|string) : boolean|ScoreboardObjective =>{
    if (typeof IdOrName == "number" || /^[1-9]/.test(IdOrName)){
        IdOrName = Number(IdOrName)
        // @ts-ignore
        const xIsLand : ScoreboardScoreInfo  = Array.from(ScoreBase.GetObject("##xSkyLands##").getScores()).find((_ : ScoreboardScoreInfo)=>{
            return _.score === IdOrName
        })
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


const NewIsLand = (name : string) : number =>{
    if (AssIsLand(name))return 0

    const UID : number = ScoreBase.GetPoints('"'+"##xSkyLands##currentUID"+'"','"'+"##xSkyLands##currentUID"+'"');
    ScoreBase.AddPointsAsync('"'+"##xSkyLands##currentUID"+'"','"'+"##xSkyLands##currentUID"+'"',"1")
    ScoreBase.NewObjectAsync('"'+"##xSkyLand##"+name+'"','"'+"##xSkyLand##"+name+'"',"dummy")
    ScoreBase.SetPointsAsync('"'+"##xSkyLand##"+name+'"','"'+"##xSkyLand##"+"UID"+'"',String(UID))
}




