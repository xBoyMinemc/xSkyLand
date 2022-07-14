import { ScoreboardObjective, TickEvent, world } from "mojang-minecraft";
import ScoreBase from "./rw";



const ScoreBaseTickCachePool        : (Map<string,Object>|Map<string,number>) = new Map();
let   ScoreBaseTickCacheControl : number = 0;
const ScoreBaseTickCacheControlSet  = (event : TickEvent)=>{ScoreBaseTickCacheControl=event.currentTick};


// @ts-ignore
const ScoreBaseTickCacheSetObject  = (ScoreObjectName : string) : object => ScoreBaseTickCachePool.set(ScoreObjectName,ScoreBase.GetObject(ScoreObjectName));
// @ts-ignore
const ScoreBaseTickCacheSetControl = (ScoreObjectName : string) : object => ScoreBaseTickCachePool.set(ScoreObjectName+"##Control##",ScoreBaseTickCacheControl);

const ScoreBaseTickCacheGet = (ScoreObjectName : string)  => {return (ScoreBaseTickCachePool.get(ScoreObjectName+"##Control##") === ScoreBaseTickCacheControl) ? ScoreBaseTickCachePool.get(ScoreObjectName) : (ScoreBaseTickCacheSetControl(ScoreObjectName),ScoreBaseTickCacheSetObject(ScoreObjectName))};

// @ts-ignore
const ScoreBaseTickCacheGetAllObj = () : ScoreboardObjective[] => {return (ScoreBaseTickCachePool.get("##AllObjControl##") === ScoreBaseTickCacheControl) ? ScoreBaseTickCachePool.get("##AllObj##") : (ScoreBaseTickCacheSetControl("##AllObj##"),ScoreBaseTickCachePool.set("##AllObj##",ScoreBase.GetObject()).get("##AllObj##"))};
const ScoreBaseTickCacheGetWithSign  = (ScoreObjectName : string) : (Object | number)[] =>  {return [(ScoreBaseTickCachePool.get(ScoreObjectName+"##Control##") === ScoreBaseTickCacheControl) ? ScoreBaseTickCachePool.get(ScoreObjectName) : (ScoreBaseTickCacheSetControl(ScoreObjectName),ScoreBaseTickCacheSetObject(ScoreObjectName)),ScoreBaseTickCacheControl]};


world.events.tick.subscribe((event)=>{
    // const {currentTick,deltaTime} = event;
    ScoreBaseTickCacheControlSet(event);
})

interface ScoreBaseTickCache {
    Get : ScoreboardObjective[],
    GetAllObj : ScoreboardObjective[],
    GetWithSign : (Object | number)[]
}

const ScoreBaseTickCache = {
    Get : ScoreBaseTickCacheGet,
    GetAllObj : ScoreBaseTickCacheGetAllObj,
    GetWithSign : ScoreBaseTickCacheGetWithSign
}
export default ScoreBaseTickCache;