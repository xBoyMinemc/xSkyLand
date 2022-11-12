import { world } from "@minecraft/server";
import ScoreBase from "./rw";
const ScoreBaseTickCachePool = new Map();
let ScoreBaseTickCacheControl = 0;
const ScoreBaseTickCacheControlSet = (event) => { ScoreBaseTickCacheControl = event.currentTick; };
const ScoreBaseTickCacheSetObject = (ScoreObjectName) => ScoreBaseTickCachePool.set(ScoreObjectName, ScoreBase.GetObject(ScoreObjectName));
const ScoreBaseTickCacheSetControl = (ScoreObjectName) => ScoreBaseTickCachePool.set(ScoreObjectName + "##Control##", ScoreBaseTickCacheControl);
const ScoreBaseTickCacheGet = (ScoreObjectName) => { return (ScoreBaseTickCachePool.get(ScoreObjectName + "##Control##") === ScoreBaseTickCacheControl) ? ScoreBaseTickCachePool.get(ScoreObjectName) : (ScoreBaseTickCacheSetControl(ScoreObjectName), ScoreBaseTickCacheSetObject(ScoreObjectName)); };
const ScoreBaseTickCacheGetAllObj = () => { return (ScoreBaseTickCachePool.get("##AllObjControl##") === ScoreBaseTickCacheControl) ? ScoreBaseTickCachePool.get("##AllObj##") : (ScoreBaseTickCacheSetControl("##AllObj##"), ScoreBaseTickCachePool.set("##AllObj##", ScoreBase.GetObject()).get("##AllObj##")); };
const ScoreBaseTickCacheGetWithSign = (ScoreObjectName) => { return [(ScoreBaseTickCachePool.get(ScoreObjectName + "##Control##") === ScoreBaseTickCacheControl) ? ScoreBaseTickCachePool.get(ScoreObjectName) : (ScoreBaseTickCacheSetControl(ScoreObjectName), ScoreBaseTickCacheSetObject(ScoreObjectName)), ScoreBaseTickCacheControl]; };
world.events.tick.subscribe((event) => {
    ScoreBaseTickCacheControlSet(event);
});
const ScoreBaseTickCache = {
    GetObject: ScoreBaseTickCacheGet,
    GetAllObj: ScoreBaseTickCacheGetAllObj,
    GetWithSign: ScoreBaseTickCacheGetWithSign
};
export default ScoreBaseTickCache;
