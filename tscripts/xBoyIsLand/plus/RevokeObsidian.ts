import {
    type EntityInventoryComponent,
    type Player,
    ItemStack,
    world
} from '@minecraft/server'


//空桶回收黑曜石为岩浆
world.afterEvents.itemUse.subscribe(({source:source,itemStack:item})=>{
    const player = <Player>source;
    if(!player.isSneaking)return;
    // player.sendMessage("ssssssss"+item.typeId+item.amount)
    if(item.typeId==='minecraft:bucket'&&item.amount===1){
        const block = player.getBlockFromViewDirection({maxDistance:8}).block;
        if(block&&block.typeId==='minecraft:obsidian'){

            const inv = <EntityInventoryComponent>player.getComponent('inventory');
            inv.container.setItem(player.selectedSlotIndex, new ItemStack("minecraft:lavaBucket"))

            block.setType("minecraft:air")
        }
    }
})