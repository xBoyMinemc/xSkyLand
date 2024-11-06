import { ItemStack, world } from '@minecraft/server';
world.afterEvents.itemUse.subscribe(({ source: source, itemStack: item }) => {
    const player = source;
    if (!player.isSneaking)
        return;
    if (item.typeId === 'minecraft:bucket' && item.amount === 1) {
        const block = player.getBlockFromViewDirection({ maxDistance: 8 }).block;
        if (block && block.typeId === 'minecraft:obsidian') {
            const inv = player.getComponent('inventory');
            inv.container.setItem(player.selectedSlotIndex, new ItemStack("minecraft:lavaBucket"));
            block.setType("minecraft:air");
        }
    }
});
