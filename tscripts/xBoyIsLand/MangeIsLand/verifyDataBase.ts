import   ScoreBase      from "../../lib/xboyTools/scoreBase/rw";
import   ScoreBaseTickCache      from "../../lib/xboyTools/scoreBase/heart";

let ScoreBaseSnapshot = ScoreBaseTickCache.GetAllObj();

// @ts-ignore
const checkScoreObjectExist = (ScoreObjectName : string) : boolean => {
    let _a = 0;
    ScoreBaseSnapshot.forEach((ScoreObject)=>{if(ScoreObjectName === ScoreObject.id)_a++;});
    return Boolean(_a)
}

let a = function(){
["##xSkyLands##","##xSkyPlayers##","##xSkyConfigs##","##xSkyLevels##"].forEach((_)=>{
    checkScoreObjectExist(_) 
    ? console.error(_,"存在")
    : (ScoreBase.NewObjectAsync('"'+_+'"', '"'+_+'"',"dummy"),console.error(_,"不存在但已创建"))
})

}

export default a;