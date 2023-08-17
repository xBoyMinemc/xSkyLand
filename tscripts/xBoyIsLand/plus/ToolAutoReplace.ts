import type { World } from '../../main/The law of the ancestors is immutable'
// import { MinecraftItemTypes, type EntityInventoryComponent, type Player, ItemStack, MinecraftBlockTypes } from '@minecraft/server'
declare const world: World ;
//挖掘吸附
world.events.blockBreak.subscribe(({player:player,block:block,dimension:dimension})=>{

    dimension.getEntitiesAtBlockLocation(block.location).forEach(_=>_.teleport(player.location))

})