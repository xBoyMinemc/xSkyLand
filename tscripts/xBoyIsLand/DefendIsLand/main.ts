import { Dimension,Location,world } from "mojang-minecraft";
import Chunk_Boundary_Point from "../../lib/xboyTools/math/chunk";
import kyj from "../../lib/xboyTools/孔乙己/回字的左旋写法";
import config from "../config";
import {GetIsPlayerScore,GetIsPlayerInIsLandScore} from "./rw";


const overworld : Dimension = world.getDimension("overworld");



const Permission = (playerName : string,postion : Location)=>{

    const UID = GetIsPlayerScore(playerName);//获取玩家从属岛屿UID
    // overworld.runCommand(`me "UID=>",${UID}`)
    if(UID<0)return -1;

    let [x,z] = Chunk_Boundary_Point.x92D([postion.x,postion.z]);
        [x,z] = [x/144,z/144]

        // overworld.runCommand(`me "xz=>",${[x,z]}`)
    const index = kyj.pos2index([x,z]);//获取玩家所在区域的编号
    // overworld.runCommand(`me "index=>",${index}`)
    if(index<(config.HoldRadius*2+1)**2)return 0;

    if(UID==index)return 7;

    const per = GetIsPlayerInIsLandScore(playerName,index);//获取玩家指定岛屿上的权限等级
    if(per<=0)return 0;

    return per;
  

}
  
world.events.tick.subscribe((_)=>{
    Array.from(overworld.getPlayers()).forEach((player : Player)=>{
        let per = Permission(player.name,player.location);//获取玩家当前区域的岛屿权限等级
        
        // player.runCommand("me per=> "+per);
        if(per<= 0)player.runCommand("gamemode spectator @s[m=s]");
        if(per===7)player.runCommand("gamemode survival @s[m=!s]");
        // if(per-1===0){player.runCommand("gamemode survival @s");return;}
        //    per-=1;
        // if(per-4===0){player.runCommand("gamemode adventure @s");return;}
        // if(per===2)player.runCommand("gamemode survival @s");

    })

})