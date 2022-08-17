import { Dimension,Location,Player,world } from "mojang-minecraft";
import Chunk_Boundary_Point from "../../lib/xboyTools/math/chunk";
import kyj from "../../lib/xboyTools/孔乙己/回字的左旋写法";
import config from "../config";
import {GetIsPlayerScore,GetIsPlayerInIsLandScore} from "./rw";


const overworld : Dimension = world.getDimension("overworld");



const Permission = (playerName : string,postion : Location)=>{

    const UID = GetIsPlayerScore(playerName);//获取玩家从属岛屿UID
    // overworld.runCommand(`me "UID=>",${UID}`)
    if (UID < 0)
        return '000';
    let [x, z] = Chunk_Boundary_Point.x92D([postion.x, postion.z]);
        [x, z] = [x / 144, z / 144];
    // overworld.runCommand(`me "xz=>",${[x,z]}`)
    const index = kyj.pos2index([x, z]); //获取玩家所在区域的编号
    // overworld.runCommand(`me "index=>",${index}`)
    if (index < (config.HoldRadius * 2 + 1) ** 2)
        return '000';
    if (UID == index)
        return '111';
    const per = GetIsPlayerInIsLandScore(playerName, index); //获取玩家指定岛屿上的权限等级
    if (per <= 0)
        return '000';

    return per.toString(2);
};
export {Permission};
world.events.tick.subscribe((_)=>{
    Array.from(overworld.getPlayers()).forEach((player : Player)=>{
        let per = Permission(player.name,player.location);//获取玩家当前区域的岛屿权限等级
        //读 写 操作
        // player.runCommand("me per=> "+per);
    //     console.log(typeof per,per)
    if (per === '000')//外来者
    {
        //gamemode spectator @s[m=!spectator]
        //获得成就《细  说》
        player.runCommand("gamemode spectator @s[m=a]");
        player.runCommand("gamemode spectator @s[m=s]");
        player.runCommand("gamemode spectator @s[m=c]");
    }
    // if (per === '111')//岛主
    if (per.endsWith("1"))//岛主
        player.runCommand("gamemode survival @s[m=!survival]");
    if (per === '110')//成员，可破坏建造
        player.runCommand("gamemode survival @s[m=!survival]");
    if (per === '100')//审批访客，可冒险游荡
        player.runCommand("gamemode adventure @s[m=!adventure]");

    })

})