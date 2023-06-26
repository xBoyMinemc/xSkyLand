import type { World } from '../../main/The law of the ancestors is immutable'
import { MinecraftItemTypes, type EntityInventoryComponent, type Player, ItemStack, MinecraftBlockTypes } from '@minecraft/server'
declare const world: World ;
//空桶回收黑曜石为岩浆
world.events.itemUse.subscribe(({source:source,itemStack:item})=>{
    const player = <Player>source;
    if(!player.isSneaking)return;
    // player.sendMessage("ssssssss"+item.typeId+item.amount)
    if(item.typeId==='minecraft:bucket'&&item.amount===1){
        const block = player.getBlockFromViewDirection({maxDistance:8});
        if(block&&block.typeId==='minecraft:obsidian'){

            const inv = <EntityInventoryComponent>player.getComponent('inventory');
            inv.container.setItem(player.selectedSlot, new ItemStack(MinecraftItemTypes.lavaBucket))

            block.setType(MinecraftBlockTypes.air)
        }
    }
})