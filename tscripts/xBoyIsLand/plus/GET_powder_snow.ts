// 哦，我是天才。我们可以增加一个工艺。用桶对着脚手架上的雪块右键获得细雪。

import { world, system, ItemStack } from '@minecraft/server'

world.beforeEvents.playerInteractWithBlock.subscribe(event => {
    const { player, itemStack: item } = event
    if (player === undefined || player.location === undefined) return
    if (item === undefined || item.typeId === undefined) return
    if (item.typeId !== 'minecraft:bucket') return
    const block = event.block
    if (block?.typeId !== 'minecraft:snow') return
    if (block?.below().typeId !== 'minecraft:scaffolding') return
    // 假设使用主手
    const container = player.getComponent('minecraft:inventory').container
    const nownow = container.getItem(player.selectedSlotIndex);
    if (nownow.typeId !== 'minecraft:bucket') return "我判断了两次物品，一次判断是否是桶，一次也判断是否是桶"
    if (nownow.amount <= 0) return

    system.run(() => {

        const container = player.getComponent('minecraft:inventory').container
        const nownow = container.getItem(player.selectedSlotIndex);

        if (nownow.typeId !== 'minecraft:bucket') return "我判断了两次物品，一次判断是否是桶，一次也判断是否是桶"
        if (nownow.amount <= 0) return
        block.setType('minecraft:air')

        container.addItem(new ItemStack('minecraft:powder_snow_bucket', 1))

        if (nownow.amount === 1) {
            container.setItem(player.selectedSlotIndex, new ItemStack('minecraft:air', 33))
        } else if (nownow.amount > 1) {
            nownow.amount -= 1
            container.setItem(player.selectedSlotIndex, nownow)
        }
        player.playSound('bucket.fill_powder_snow', {
            location: block.location,
            volume: 1,
            pitch: 1
        })
    })

})