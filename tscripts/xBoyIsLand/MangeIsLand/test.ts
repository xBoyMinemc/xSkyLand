import { Location, world } from "mojang-minecraft";
import Chunk_Boundary_Point from "../../lib/xboyTools/math/chunk";
import ScoreBase from "../../lib/xboyTools/scoreBase/rw";
import kyj from "../../lib/xboyTools/孔乙己/回字的左旋写法";
import xIsLand from "./xIsLand";


const overworld = world.getDimension("overworld");

let index = ()=>  ScoreBase.GetPoints("##xSkyConfigs##", "##xSkyLands##currentUID");

// world.events.chat.subscribe((_)=>{
//     const pos = kyj.index2pos(index)
//     _.sender.teleport(new Location(pos[0],500,pos[1]),_.sender.dimension,0,0,true);
//     index++;;
// })


world.events.chat.subscribe((_)=>{
    const [x,z] = kyj.index2pos(index());
    //第一个测试空岛
        if(!xIsLand.NewIsLand(String(_.message),_.sender.name)){
            console.error(`此UID=> 已经存在`)
            return 0;
        }
            
    //structure load xsky_1 ~ ~ ~
    // overworld.runCommand(`me load xsky_1 ${x*144} 490 ${z*144}`)

    // /spawnpoint "Xboy minemc" ~ ~ ~
    //老年痴呆
    overworld.runCommandAsync(`spawnpoint "${_.sender.name}" ${x*144+74} 512 ${z*144+74}`)
    overworld.runCommandAsync(`tp @a ${x*144+74} -490 ${z*144+74}`)
    console.error(`me 第${index()}号空岛新建成功`)
    overworld.runCommand(`structure load xsky_1 ${x*144+72} -510 ${z*144+72}`)
    
    // overworld.runCommand(`setblock ${pos[0]} 501 ${pos[1]} stained_glass ${(Math.random()*16)>>>0}`)

    // index++;
        
})
// world.events.tick.subscribe((_)=>{
//     const [x,z] = kyj.index2pos(index);
//     //第一个测试空岛
//         // xIsLand.NewIsLand("01",_.sender.name)
//     //structure load xsky_1 ~ ~ ~
//     // overworld.runCommand(`me load xsky_1 ${x*144} 490 ${z*144}`)
//     // overworld.runCommandAsync(`tp @a ${x*144+74} 512 ${z*144+74}`)
//     // console.error(`me 第${index}号空岛新建成功`)
//     // overworld.runCommand(`structure load xsky_1 ${x*144+72} 490 ${z*144+72}`)
    
//     overworld.runCommand(`setblock ${x} 502 ${z} wool ${(Math.random()*16)>>>0}`)

//     index++;
// })