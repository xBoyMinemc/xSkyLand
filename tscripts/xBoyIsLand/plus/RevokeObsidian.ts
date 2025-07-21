import {
    type EntityInventoryComponent,
    type Player,
    ItemStack,
    world, ItemTypes, system
} from '@minecraft/server'


//空桶回收黑曜石为岩浆
world.beforeEvents.playerInteractWithBlock.subscribe(event=>{
    const {player, itemStack:item} = event
    if(item === undefined || item.typeId === undefined)return

    if(!player.isSneaking)return
    // player.sendMessage("ssssssss"+item.typeId+" # data: "+item.amount)
    if(item.typeId==='minecraft:bucket'&&item.amount===1){
        const block = player.getBlockFromViewDirection({maxDistance:8}).block
        if(block?.typeId!=='minecraft:obsidian')return
        // 阻止这次事件，防止造成副作用
        event.cancel = true
        const inv = <EntityInventoryComponent>player.getComponent('inventory')

        system.run(()=>{
            inv.container.setItem(player.selectedSlotIndex, new ItemStack(ItemTypes.get('minecraft:lava_bucket')))
            block.setType("minecraft:air")
        })

    }
})