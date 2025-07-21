import { world } from "@minecraft/server";
import ScoreBase from "../../lib/xboyTools/scoreBase/rw";
const AssIsPlayer = (playerName) => {
    if (typeof playerName !== "string")
        return false;
    const xIsLandObject = ScoreBase.AssObject("##xSkyPlayers##");
    if (!xIsLandObject)
        return false;
    return xIsLandObject.hasParticipant(playerName);
};
const GetIsPlayerScore = (playerName) => {
    if (typeof playerName !== typeof "string")
        return -3;
    const xIsLandObject = ScoreBase.AssObject("##xSkyPlayers##");
    if (!xIsLandObject)
        return -4;
    if (!xIsLandObject.hasParticipant(playerName)) {
        xIsLandObject.getScores().forEach(p => {
            if (p.participant.displayName === playerName)
                xIsLandObject.setScore(playerName, p.score);
        });
        return -5;
    }
    ;
    return xIsLandObject.getScore(playerName);
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
    ScoreBase.SetPointsAsync("##xSkyPlayers##", playerName, score);
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
const NewIsLand = (landName, owner) => {
    const UID = ScoreBase.GetPoints("##xSkyConfigs##", "##xSkyLands##currentUID");
    const landUIDName = "##xSky##" + String(UID);
    if (AssIsLand("##xSky##" + String(UID)))
        return 0;
    ScoreBase.AddPointsAsync("##xSkyConfigs##", "##xSkyLands##currentUID", 1);
    world.getDimension('overworld').runCommand(`me ${landUIDName} ${landName}`);
    ScoreBase.NewObjectAsync(landUIDName, landUIDName);
    ScoreBase.SetPointsAsync(landUIDName, landName, 777);
    ScoreBase.SetPointsAsync(landUIDName, "UID", UID);
    ScoreBase.SetPointsAsync(landUIDName, owner, 7);
    ScoreBase.SetPointsAsync("##xSkyPlayers##", owner, UID);
    return 1;
};
const NewMemberIsLand = (UID, MemberName) => {
    const landUIDName = "##xSky##" + String(UID);
    if (!AssIsLand(landUIDName))
        return 0;
    ScoreBase.SetPointsAsync(landUIDName, MemberName, 4 + 2);
    ScoreBase.SetPointsAsync("##xSkyPlayers##", MemberName, UID);
    return 4 + 2;
};
const xIsLand = {
    NewIsLand: NewIsLand,
    GetIsPlayerInIsLandScore: GetIsPlayerInIsLandScore,
    GetIsPlayerScore: GetIsPlayerScore,
};
export default xIsLand;
