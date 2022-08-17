import { Location, world } from "mojang-minecraft";
import Chunk_Boundary_Point from "../../lib/xboyTools/math/chunk";
import ScoreBase from "../../lib/xboyTools/scoreBase/rw";
import kyj from "../../lib/xboyTools/孔乙己/回字的左旋写法";
import xIsLand from "./xIsLand";
import { Permission } from "../DefendIsLand/main";

const overworld = world.getDimension("overworld");

let GetIndex = ()=>  ScoreBase.GetPoints("##xSkyConfigs##", "##xSkyLands##currentUID");

// world.events.chat.subscribe((_)=>{
//     const pos = kyj.index2pos(index)
//     _.sender.teleport(new Location(pos[0],500,pos[1]),_.sender.dimension,0,0,true);
//     index++;;
// })

overworld.runCommand(`me me reload`)

world.events.chat.subscribe((_: { message: string; sender: { name: string; runCommand: (arg0: string) => void; }; })=>{
    

    if(!_.message.startsWith("~island"))return;
    
if(_.message=="~island"){
    
    // xIsLand.GetIsPlayerScore(_.sender.name)
    const [x,z] = kyj.index2pos(xIsLand.GetIsPlayerScore(_.sender.name));
    overworld.runCommandAsync(`tp @a ${x*144+74} -490 ${z*144+74}`);
    return;

}

const 新建岛屿 = (ower: { message?: string; sender?: { name: string; runCommand: (arg0: string) => void; }; name?: any; runCommand?: any; },name:string) =>{

    
    if(xIsLand.GetIsPlayerScore(ower.name)>0){
        overworld.runCommand(`me 已经有自己的岛了`)
        return;
    }
    const index = GetIndex()
    const [x,z] = kyj.index2pos(index);
    //第一个测试空岛
        if(!xIsLand.NewIsLand(String(name),ower.name)){
            overworld.runCommand(`此UID=> 已经存在`)
            return 0;
        }
        
    ower.runCommand(`spawnpoint @s ${x*144+74} -490 ${z*144+74}`);//设置重生点
    ower.runCommand(`tp @s ${x*144+74} -490 ${z*144+74}`);//送到岛所处区域，并加载这片区域
    

    overworld.runCommand(`me 第${index}号空岛新建成功`);
    overworld.runCommand(`structure load xsky_1 ${x*144+72} -510 ${z*144+72}`);//加载空岛结构模板
    
    // overworld.runCommand(`setblock ${pos[0]} 501 ${pos[1]} stained_glass ${(Math.random()*16)>>>0}`)
        
}
if(_.message.startsWith("~island "))新建岛屿(_.sender,_.message.replace("~island ",""));
const 删除所在岛屿 = (player)=>{
    const per = Permission(player.name,player.location);
    if(per.endsWith("1")){
        player.runCommand('tellraw @s {"rawtext": [{"text": "无法删除，因为不是岛主"}]}');
        return;
    };
    
};
if(_.message.startsWith("~island del"))删除所在岛屿(_.sender);

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