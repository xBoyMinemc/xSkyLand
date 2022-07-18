import { world } from "mojang-minecraft";
import ScoreBase from "../../lib/xboyTools/scoreBase/rw";
import kyj from "../../lib/xboyTools/孔乙己/回字的左旋写法";
const overworld = world.getDimension("overworld");
let index = ScoreBase.GetPoints("##xSkyConfigs##", "##xSkyLands##currentUID");
// world.events.chat.subscribe((_)=>{
//     const pos = kyj.index2pos(index)
//     _.sender.teleport(new Location(pos[0],500,pos[1]),_.sender.dimension,0,0,true);
//     index++;;
// })
world.events.tick.subscribe((_) => {
    const pos = kyj.index2pos(index);
    index++;
    ;
    // overworld.runCommand("me 6jytrvfd")
    // overworld.runCommand(`setblock ${pos[0]} 501 ${pos[1]} stained_glass ${(Math.random()*16)>>>0}`)
});
