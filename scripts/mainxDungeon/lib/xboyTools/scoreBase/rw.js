// import { world } from "@minecraft/server";
// const overworld = world.getDimension("overworld");
const dress = (str) => ((str.startsWith('"') && str.endsWith('"')) ? str : ('"' + str + '"'));
const a = (ar) => typeof ar === "undefined" ? "000" : 777;
const GetScoreBoard = world.scoreboard;
const GetScoreObject = (ScoreboardObjectiveNameOrVoidForAll) => typeof ScoreboardObjectiveNameOrVoidForAll === "string" ? GetScoreBoard.getObjective(ScoreboardObjectiveNameOrVoidForAll) : GetScoreBoard.getObjectives();
const GetScorePartic = (args) => typeof args === "undefined" ? GetScoreBoard.getParticipants() :
    typeof args === "number" ? Array.from(GetScoreBoard.getParticipants()).find(Participant => Participant.id === args) :
        typeof args === "string" ? Array.from(GetScoreBoard.getParticipants()).find(Participant => Participant.displayName === args) :
            typeof args === "object" ? Array.from(GetScoreBoard.getParticipants()).find(Participant => Participant.getEntity() === args) :
                undefined;
const GetScorePoints = (ScoreBoardObject, partic) => ((typeof ScoreBoardObject === "string" ? (ScoreBoardObject = GetScoreObject(ScoreBoardObject)) : ScoreBoardObject) && typeof partic === typeof 521) ? Array.from(ScoreBoardObject.getScores()).find((_) => _.participant.id === partic).score : (typeof partic === typeof "xBoy minemc") ? Array.from(ScoreBoardObject.getScores()).find((_) => _.participant.displayName === partic).score : (typeof partic === "object") ? (("scoreboard" in partic) ? ScoreBoardObject.getScore(partic["scoreboard"]) : ScoreBoardObject.getScore(partic)) : null;
const AssScoreObject = (ObjName) => GetScoreObject().find((scoreboard) => (scoreboard.id === ObjName));
const AssScorePartic = (PlayerDisplayName, ScoreBoardObject) => typeof ScoreBoardObject === "object" ? ScoreBoardObject.getParticipants().find((participant) => (participant.displayName === PlayerDisplayName)) : GetScorePartic()?.find((participant) => (participant.displayName === PlayerDisplayName));
const AssScoreParticCurry = (PlayerDisplayName) => (ScoreBoardObject) => typeof ScoreBoardObject === "object" ? ScoreBoardObject.getParticipants().find((participant) => (participant.displayName === PlayerDisplayName)) : GetScorePartic().find((participant) => (participant.displayName === PlayerDisplayName));
const DelScoreObject = (NameOrObj) => { world.scoreboard.removeObjective(NameOrObj); };
const NewScoreObject = (objectiveId, displayName) => world.scoreboard.addObjective(objectiveId, displayName);
const DisScoreObject = (...args) => overworld.runCommandAsync(`scoreboard objectives setdisplay ${(typeof args[0] === typeof 520) ? ['list', 'sidebar', 'belowname'][args[0]] : args[0]} ${((typeof args[1] === typeof "云梦") ? args[1] : args[1].id) + (args[2] ? (" " + (typeof args[2] === "string" ? args[2] : ['ascending', 'descending'][args[2]])) : "")}`);
const AddScorePoints = (playerName, scoreObject, count) => overworld.runCommandAsync(`scoreboard players add ${dress(playerName)} ${(typeof scoreObject === typeof "xBoy minemc") ? scoreObject : dress(scoreObject.id)} ${count}`);
const SetScorePoints = (playerName, scoreObject, count) => overworld.runCommandAsync(`scoreboard players set ${dress(playerName)} ${(typeof scoreObject === typeof "xBoy minemc") ? scoreObject : dress(scoreObject.id)} ${count}`);
const ScoreBase = {
    GetObject: GetScoreObject,
    GetPartic: GetScorePartic,
    GetPoints: GetScorePoints,
    AssObject: AssScoreObject,
    AssPartic: AssScorePartic,
    DelObject: DelScoreObject,
    NewObject: NewScoreObject,
    DisObject: DisScoreObject,
    AddPoints: AddScorePoints,
    SetPoints: SetScorePoints
};
export default ScoreBase;
