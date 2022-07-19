import ScoreBase from "../../lib/xboyTools/scoreBase/rw";
const StrParer = (str) => '"' + str + '"';
const xStrParer = (str) => '"##xSkyLands##' + str + '"';
const yStrParer = (str) => '##xSkyLands##' + str + '';
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
        return -1;
    const xIsLandObject = ScoreBase.AssObject("##xSkyPlayers##");
    if (!xIsLandObject)
        return -1;
    return Array.from(xIsLandObject.getScores()).find((_) => _.participant.displayName == playerName).score;
};
const SetIsPlayerScore = (playerName, score) => {
    if (typeof playerName !== "string" || typeof score !== "number")
        return false;
    ScoreBase.SetPointsAsync(playerName, StrParer("##xSkyPlayers##"), String(score));
    return true;
};
const AssIsLand = (IdOrName) => {
    if (typeof IdOrName == "number" || /^[1-9]/.test(IdOrName)) {
        IdOrName = Number(IdOrName);
        // @ts-ignore
        const xIsLand = Array.from(ScoreBase.GetObject("##xSkyLands##").getScores()).find((_) => { return _.score === IdOrName; });
        if (!xIsLand)
            return false;
        const xIsLandObject = ScoreBase.AssObject(xIsLand.participant.displayName);
        if (!xIsLandObject)
            return false;
        return xIsLandObject;
    }
    else {
        const xIsLandObject = ScoreBase.AssObject(IdOrName);
        if (!xIsLandObject)
            return false;
        return xIsLandObject;
    }
};
const NewIsLand = (name, owner) => {
    if (AssIsLand(name))
        return 0;
    const UID = ScoreBase.GetPoints("##xSkyConfigs##", "##xSkyLands##currentUID");
    // world.getDimension('overworld').runCommand(`me ${xStrParer("currentUID")} ${xStrParer("currentUID")}  ${String(UID)}`)
    ScoreBase.AddPointsAsync(StrParer("##xSkyLands##currentUID"), StrParer("##xSkyConfigs##"), "1");
    ScoreBase.NewObjectAsync(xStrParer(name), xStrParer(name), "dummy");
    ScoreBase.SetPointsAsync(xStrParer("UID"), xStrParer(name), String(UID));
    // ScoreBase.SetPointsAsync(xStrParer(owner),xStrParer(name),String(8))
    ScoreBase.SetPointsAsync(StrParer(owner), StrParer("##xSkyPlayers##"), String(UID));
};
const xIsLand = {
    NewIsLand: NewIsLand
};
export default xIsLand;
