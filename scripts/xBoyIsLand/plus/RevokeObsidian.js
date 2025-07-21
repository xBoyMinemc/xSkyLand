import { ItemStack, world, ItemTypes, system } from '@minecraft/server';
world.beforeEvents.playerInteractWithBlock.subscribe(event => {
    const { player, itemStack: item } = event;
    if (item === undefined || item.typeId === undefined)
        return;
    if (!player.isSneaking)
        return;
    if (item.typeId === 'minecraft:bucket' && item.amount === 1) {
        const block = player.getBlockFromViewDirection({ maxDistance: 8 }).block;
        if (block?.typeId !== 'minecraft:obsidian')
            return;
        event.cancel = true;
        const inv = player.getComponent('inventory');
        system.run(() => {
            inv.container.setItem(player.selectedSlotIndex, new ItemStack(ItemTypes.get('minecraft:lava_bucket')));
            block.setType("minecraft:air");
        });
    }
});
