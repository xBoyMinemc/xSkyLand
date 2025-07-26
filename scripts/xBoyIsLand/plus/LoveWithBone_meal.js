import { world, system, BlockVolume } from '@minecraft/server';
world.beforeEvents.playerInteractWithBlock.subscribe(event => {
    const { player, itemStack: item } = event;
    if (player === undefined || player.location === undefined)
        return;
    if (item === undefined || item.typeId === undefined)
        return;
    if (item.typeId !== 'minecraft:bone_meal')
        return;
    const breakBlock = event.block;
    if (breakBlock?.typeId !== 'minecraft:moss_block')
        return;
    const dimenion = breakBlock.dimension;
    const { x, y, z } = breakBlock.location;
    const getBlockLocation = breakBlock.dimension.getBlocks(new BlockVolume({ x: x - 3, y: y - 3, z: z - 3 }, { x: x + 3, y: y + 3, z: z + 3 }), { includeTypes: ["minecraft:cobblestone"] });
    const blocks = [];
    system.run(() => {
        const gen = getBlockLocation.getBlockLocationIterator();
        let blockLocation = null;
        while (blockLocation = gen.next().value) {
            if (dimenion.getBlock(blockLocation).above().isAir)
                blocks.push(blockLocation);
        }
        blocks.forEach(blockLocation => {
            dimenion.getBlock(blockLocation).setType("minecraft:stone");
        });
    });
});
