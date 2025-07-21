import {Player, world} from "@minecraft/server";
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
 

world.afterEvents.chatSend.subscribe(_=>{
     
if(_.message==="重开" && _.sender.hasTag('remake')){

    // if(xIsLand.GetIsPlayerScore(_.sender.name)<=0){
    //     // _.sender.runCommand(`me 还没有自己的岛\u000a输入 ~island空格+岛屿名\u000a以便于创建自己的岛屿"`)
    //     _.sender.sendMessage('[摆烂空岛] 还没有自己的岛\u000a输入 ~island空格+岛屿名\u000a以便于创建自己的岛屿');
    
    //     return;
    // }
    // xIsLand.GetIsPlayerScore(_.sender.name)
    const [x,z] = kyj.index2pos(xIsLand.GetIsPlayerScore(_.sender.name));
    // _.sender.teleport({x:x * 144 + 74,y: -490 ,z:z * 144 + 74});
    overworld.runCommand(`tp ${x * 144 + 74} -490 ${z * 144 + 74}`);
    overworld.runCommand(`structure load xsky_1 ${x * 144 + 72} -510 ${z * 144 + 72}`);

    return _.sender.removeTag('remake');

}
    if(!_.message.startsWith("~island"))return;

    if(_.message==="~island"){

        if(xIsLand.GetIsPlayerScore(_.sender.name)<=0)
            return _.sender.sendMessage('[摆烂空岛] 还没有自己的岛\u000a输入 ~island空格+岛屿名\u000a以便于创建自己的岛屿');

        // xIsLand.GetIsPlayerScore(_.sender.name)
        const [x,z] = kyj.index2pos(xIsLand.GetIsPlayerScore(_.sender.name));
        _.sender.teleport({x:x * 144 + 74,y: -490 ,z:z * 144 + 74});
        return;
    }

    const 新建岛屿 = (ower:Player,name:string) =>{

    
        if(xIsLand.GetIsPlayerScore(ower.name)>0){
            // overworld.runCommand(`me 已经有自己的岛了`)
            ower.sendMessage('[摆烂空岛] 已经有自己的岛了')

            return;
        }
        const index = GetIndex()
        const [x,z] = kyj.index2pos(index);
        //第一个测试空岛
            if(!xIsLand.NewIsLand(String(name),ower.name)){
                ower.sendMessage('[摆烂空岛] 此UID=> 已经存在')
            return 0;
        }
        
        ower.setSpawnPoint({x:x * 144 + 74,y: -490 ,z:z * 144 + 74,dimension:ower.dimension});
        ower.teleport({x:x * 144 + 74,y: -490 ,z:z * 144 + 74});
        world.sendMessage(`[摆烂空岛] 第${index}号-${name}-空岛开始创建`)
        
        // overworld.structure
        // ower.runCommand(`spawnpoint @s ${x * 144 + 74} -490 ${z * 144 + 74}`);
        // ower.runCommand(`tp @s ${x * 144 + 74} -490 ${z * 144 + 74}`);
        // overworld.runCommand(`me 第${index}号空岛新建开始`);
        overworld.runCommand(`structure load xsky_1 ${x * 144 + 72} -510 ${z * 144 + 72}`);

        world.sendMessage(`[摆烂空岛] 第${index}号空岛-${name}-完成创建`)
          
    }

    if(_.message.startsWith("~island ") && _.message !== "~island ")新建岛屿(_.sender,_.message.replace("~island ",""));

    const 删除所在岛屿 = (player:Player)=>{
        const per = Permission(player.name,player.location);
        if(!per.endsWith("1")){
            player.sendMessage('[摆烂空岛] 无法删除，因为不是岛主');
        
            return;
        }else{
            player.sendMessage('[摆烂空岛] 可以删除，因为是岛主');
        
            return;
        }
    
    }

    if(_.message.startsWith("~island del"))删除所在岛屿(_.sender);

})
// world.events.tick.subscribe((_)=>{
//     const [x,z] = kyj.index2pos(index);
//     //第一个测试空岛
//         // xIsLand.NewIsLand("01",_.sender.name)
//     //structure load xsky_1 ~ ~ ~
//     // overworld.runCommand(`me load xsky_1 ${x*144} 490 ${z*144}`)
//     // overworld.runCommand(`tp @a ${x*144+74} 512 ${z*144+74}`)
//     // console.error(`me 第${index}号空岛新建成功`)
//     // overworld.runCommand(`structure load xsky_1 ${x*144+72} 490 ${z*144+72}`)
    
//     overworld.runCommand(`setblock ${x} 502 ${z} wool ${(Math.random()*16)>>>0}`)

//     index++;
// })