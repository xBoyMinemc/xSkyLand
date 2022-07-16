import ScoreBase from "../../lib/xboyTools/scoreBase/rw";
import ScoreBaseTickCache from "../../lib/xboyTools/scoreBase/heart";
import config from "../config";
let ScoreBaseSnapshot = ScoreBaseTickCache.GetAllObj();
// @ts-ignore
const checkScoreObjectExist = (ScoreObjectName) => !!Array.from(ScoreBaseSnapshot).find((ScoreObject) => { if (ScoreObjectName === ScoreObject.id)
    return 1; });
const verif = function () {
    ScoreBaseSnapshot = ScoreBaseTickCache.GetAllObj();
    ["##xSkyLands##", "##xSkyPlayers##", "##xSkyConfigs##", "##xSkyLevels##"].forEach((_) => {
        checkScoreObjectExist(_)
            ? console.error(_, "存在")
            : (ScoreBase.NewObjectAsync('"' + _ + '"', '"' + _ + '"', "dummy"), console.error(_, "不存在但已创建"));
    });
    // ["##xSkyLands##" ,"##xSkyPlayers##"].forEach((_:string)=>ScoreBase.GetPartic(ScoreBaseTickCache.GetObject(_)).forEach((__) => {
    //     checkScoreObjectExist(__.displayName) 
    //     ? console.error(_,  "数据存在==>",__.displayName)
    //     : console.error(_,"数据不存在==>",__.displayName);
    // }));
    !!ScoreBase.AssPartic("##xSkyLands##currentUID", ScoreBase.GetObject("##xSkyConfigs##"))
        ? console.error("数据存在==>", "##xSkyLands##currentUID")
        : (ScoreBase.AddPointsAsync('"' + "##xSkyLands##currentUID" + '"', '"' + "##xSkyConfigs##" + '"', "0"), console.error("数据不存在但已创建==>", "##xSkyLands##currentUID"));
    (ScoreBase.GetPoints("##xSkyConfigs##", "##xSkyLands##currentUID") < (config.HoldRadius * 2 + 1) ** 2)
        ? ScoreBase.SetPointsAsync('"' + "##xSkyLands##currentUID" + '"', '"' + "##xSkyConfigs##" + '"', ((config.HoldRadius * 2 + 1) ** 2).toFixed(0))
        : 0;
};
export default verif;
