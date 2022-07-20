import { world } from "mojang-minecraft";
import ScoreBase from "../../lib/xboyTools/scoreBase/rw";
const StrParer = (str) => '"' + str + '"';
const xStrParer = (str) => '"##xSkyLands##' + str + '"';
const yStrParer = (str) => '##xSkyLands##' + str + '';
const zStrParer = (str) => '"##xSky##' + str + '"';
const aStrParer = (str) => '##xSky##' + str + '';
const AssIsPlayer = (playerName) => {
    if (typeof playerName !== "string")
        return false;
    const xIsLandObject = ScoreBase.AssObject("##xSkyPlayers##");
    if (!xIsLandObject)
        return false;
    if (!Array.from(xIsLandObject.getScores()).find((_) => _.participant.displayName == playerName))
        return false;
    return true;
};
const GetIsPlayerScore = (playerName) => {
    if (typeof playerName !== "string")
        return -3;
    const xIsLandObject = ScoreBase.AssObject("##xSkyPlayers##");
    // console.log(xIsLandObject)
    if (!xIsLandObject)
        return -3;
    const player = Array.from(xIsLandObject.getScores()).find((_) => _.participant.displayName == playerName);
    if (!player)
        return -3;
    return player.score;
};
const GetIsPlayerInIsLandScore = (playerName, UID) => {
    if (typeof playerName !== "string")
        return -3;
    const xIsLandObject = ScoreBase.AssObject(aStrParer(String(UID)));
    // console.log(xIsLandObject)
    if (!xIsLandObject)
        return -3;
    const player = Array.from(xIsLandObject.getScores()).find((_) => _.participant.displayName == playerName);
    if (!player)
        return -3;
    return player.score;
};
const SetIsPlayerScore = (playerName, score) => {
    if (typeof playerName !== "string" || typeof score !== "number")
        return false;
    ScoreBase.SetPointsAsync(playerName, StrParer("##xSkyPlayers##"), String(score));
    return true;
};
const AssIsLand = (IdOrName) => {
    if (typeof IdOrName == "number" || /^[1-9]/.test(IdOrName)) {
        // IdOrName = Number(IdOrName)
        // // @ts-ignore
        // const xIsLand : ScoreboardScoreInfo  = Array.from(ScoreBase.GetObject("##xSkyLands##").getScores()).find((_ : ScoreboardScoreInfo)=>{return _.score === IdOrName})
        // if (!xIsLand) return false
        // const xIsLandObject : ScoreboardObjective = ScoreBase.AssObject(xIsLand.participant.displayName)
        // if (!xIsLandObject) return false
        //                     return xIsLandObject
    }
    {
        const xIsLandObject = ScoreBase.AssObject(IdOrName);
        console.log(IdOrName, "=>", xIsLandObject);
        if (!xIsLandObject)
            return false;
        return xIsLandObject;
    }
};
const NewIsLand = (name, owner) => {
    console.log(GetIsPlayerScore((owner)));
    const UID = ScoreBase.GetPoints("##xSkyConfigs##", "##xSkyLands##currentUID");
    const landName = zStrParer(String(UID));
    if (AssIsLand(aStrParer(String(UID))))
        return 0;
    ScoreBase.AddPointsAsync(StrParer("##xSkyLands##currentUID"), StrParer("##xSkyConfigs##"), "1");
    world.getDimension('overworld').runCommand(`me  ${landName}`);
    ScoreBase.NewObjectAsync(landName, landName, "dummy"); //为每一个岛新建一个计分板
    ScoreBase.SetPointsAsync(StrParer(name), landName, "777"); //设置岛屿名称
    ScoreBase.SetPointsAsync(StrParer("UID"), landName, String(UID)); //设置岛屿UID
    ScoreBase.SetPointsAsync(StrParer(owner), landName, String(7)); //设置岛屿中，玩家的岛屿最高管理权
    // ScoreBase.SetPointsAsync(xStrParer(owner),xStrParer(name),String(8));
    ScoreBase.SetPointsAsync(StrParer(owner), StrParer("##xSkyPlayers##"), String(UID)); //设置玩家清单中，玩家的岛屿归属
    return 1;
};
const xIsLand = {
    NewIsLand: NewIsLand,
    GetIsPlayerInIsLandScore: GetIsPlayerInIsLandScore,
};
export default xIsLand;
