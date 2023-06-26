import type { World } from '../../main/The law of the ancestors is immutable'
declare const world: World ;

// import { MinecraftItemTypes, type EntityInventoryComponent, type Player, ItemStack, MinecraftBlockTypes } from '@minecraft/server'

import Chunk_Boundary_Point from '../../lib/xboyTools/math/chunk';
import kyj from '../../lib/xboyTools/孔乙己/回字的左旋写法';

//挖掘吸附
world.events.blockBreak.subscribe(({player:player,block:block,dimension:dimension})=>{
    // block.getComponent
    dimension.getEntitiesAtBlockLocation(block.location).forEach(_=>_.teleport(player.location))

})
const getIndexFromLocation = (postion:{x:number,y:number,z:number})=>{
    
    let [x, z] = Chunk_Boundary_Point.x92D([postion.x, postion.z]);
        [x, z] = [x / 144, z / 144];
    const index = kyj.pos2index([x, z]); //获取所在区域的编号
    return index;
}

const getIslandLocationFromIndex = (index:number)=>{
    const [x,z] = kyj.index2pos(index);
    return {x:x * 144 + 74,y: -490 ,z:z * 144 + 74};
}
//运输船虚空保护
world.events.tick.subscribe(()=>{
    
    world.getDimension("overworld")
    .getEntities({type:'minecraft:chest_boat'})
    .forEach(chestBoat=>{chestBoat.location.y<-509?chestBoat.teleport(getIslandLocationFromIndex(getIndexFromLocation(chestBoat.location))):false})

    //杀人辣
    world.getDimension("overworld")
    // .getEntities({type:'minecraft:chest_boat'})
    .getPlayers()
    // .forEach(player=>{player.location.y<-528?player.kill():false})
    .forEach(player=>{player.location.y<-528?player.teleport({x:player.location.x,y:200,z:player.location.z},{dimension:world.getDimension('nether')}):false})

    
    //杀人辣
    world.getDimension("overworld")
    // .getEntities({type:'minecraft:chest_boat'})
    .getPlayers()
    // .forEach(player=>{player.location.y<-528?player.kill():false})
    .forEach(player=>{player.location.y>513?player.teleport({x:player.location.x,y:200,z:player.location.z},{dimension:world.getDimension('the end')}):false})
})