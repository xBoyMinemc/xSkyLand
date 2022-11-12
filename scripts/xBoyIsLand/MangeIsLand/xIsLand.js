import { world } from "@minecraft/server";
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
    if (typeof playerName !== typeof "string")
        return -3;
    const xIsLandObject = ScoreBase.AssObject("##xSkyPlayers##");
    if (!xIsLandObject)
        return -4;
    const player = Array.from(xIsLandObject.getScores()).find((_) => _.participant.displayName == playerName);
    if (!player)
        return -5;
    return player.score;
};
const GetIsPlayerInIsLandScore = (playerName, UID) => {
    if (typeof playerName !== "string")
        return -3;
    const xIsLandObject = ScoreBase.AssObject(aStrParer(String(UID)));
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
const AssIsLand = (UID) => {
    {
        const xIsLandObject = ScoreBase.AssObject(UID);
        if (!xIsLandObject)
            return false;
        return xIsLandObject;
    }
};
const NewIsLand = (name, owner) => {
    const UID = ScoreBase.GetPoints("##xSkyConfigs##", "##xSkyLands##currentUID");
    const landName = zStrParer(String(UID));
    if (AssIsLand(aStrParer(String(UID))))
        return 0;
    ScoreBase.AddPointsAsync(StrParer("##xSkyLands##currentUID"), StrParer("##xSkyConfigs##"), "1");
    world.getDimension('overworld').runCommandAsync(`me  ${landName}`);
    ScoreBase.NewObjectAsync(landName, landName, "dummy");
    ScoreBase.SetPointsAsync(StrParer(name), landName, "777");
    ScoreBase.SetPointsAsync(StrParer("UID"), landName, String(UID));
    ScoreBase.SetPointsAsync(StrParer(owner), landName, String(7));
    ScoreBase.SetPointsAsync(StrParer(owner), StrParer("##xSkyPlayers##"), String(UID));
    return 1;
};
const xIsLand = {
    NewIsLand: NewIsLand,
    GetIsPlayerInIsLandScore: GetIsPlayerInIsLandScore,
    GetIsPlayerScore: GetIsPlayerScore,
};
export default xIsLand;
