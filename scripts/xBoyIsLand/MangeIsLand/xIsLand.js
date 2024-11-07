import { world } from "@minecraft/server";
import ScoreBase from "../../lib/xboyTools/scoreBase/rw";
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
    const xIsLandObject = ScoreBase.AssObject("##xSky##" + (String(UID)));
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
    ScoreBase.SetPointsAsync(playerName, "##xSkyPlayers##", score);
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
    const landName = "##xSky##" + (String(UID));
    if (AssIsLand("##xSky##" + (String(UID))))
        return 0;
    ScoreBase.AddPointsAsync("##xSkyConfigs##", "##xSkyLands##currentUID", 1);
    world.getDimension('overworld').runCommandAsync(`me  ${landName}`);
    ScoreBase.NewObjectAsync(landName, landName);
    ScoreBase.SetPointsAsync(landName, name, 777);
    ScoreBase.SetPointsAsync(landName, "UID", UID);
    ScoreBase.SetPointsAsync(landName, owner, 7);
    ScoreBase.SetPointsAsync("##xSkyPlayers##", owner, UID);
    return 1;
};
const xIsLand = {
    NewIsLand: NewIsLand,
    GetIsPlayerInIsLandScore: GetIsPlayerInIsLandScore,
    GetIsPlayerScore: GetIsPlayerScore,
};
export default xIsLand;
