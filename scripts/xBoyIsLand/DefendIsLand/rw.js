import ScoreBase from "../../lib/xboyTools/scoreBase/rw";
const aStrParer = (str) => '##xSky##' + str + '';
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
// const GetIsPlayerPos = (playerName : string) : number =>{
//     if (typeof playerName !== "string")return -3;
//     const xIsLandObject : ScoreboardObjective = ScoreBase.AssObject("##xSkyPlayers##")
//     // console.log(xIsLandObject)
//     if (!xIsLandObject) return -3;
//     const player = Array.from(xIsLandObject.getScores()).find((_ : ScoreboardScoreInfo)=> _.participant.displayName == playerName);
//     if (!player) return -3;
//     return player.score;
// }
export { GetIsPlayerScore, GetIsPlayerInIsLandScore };
