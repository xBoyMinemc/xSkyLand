import { world, system, BlockVolume } from '@minecraft/server';
world.beforeEvents.playerInteractWithBlock.subscribe(event => {
    const { player, itemStack: item } = event;
    if (item === undefined || item.typeId === undefined)
        return;
    if (item.typeId === 'minecraft:bone_meal') {
        const breakBlock = event.block;
        const dimenion = breakBlock.dimension;
        if (breakBlock?.typeId !== 'minecraft:moss_block')
            return;
        const { x, y, z } = breakBlock.location;
        const getBlockLocation = breakBlock.dimension.getBlocks(new BlockVolume({ x: x - 3, y: y - 3, z: z - 3 }, { x: x + 3, y: y + 3, z: z + 3 }), { includeTypes: ["minecraft:cobblestone"] });
        const blocks = [];
        system.runTimeout(() => {
            const gen = getBlockLocation.getBlockLocationIterator();
            let blockLocation = null;
            while (blockLocation = gen.next().value) {
                if (dimenion.getBlock(blockLocation).above().isAir)
                    blocks.push(blockLocation);
            }
            blocks.forEach(blockLocation => {
                dimenion.getBlock(blockLocation).setType("minecraft:stone");
            });
        }, 0);
    }
});
