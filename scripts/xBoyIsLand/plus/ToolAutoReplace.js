import { world } from "@minecraft/server";
world.afterEvents.playerBreakBlock.subscribe(({ player: player, block: block, dimension: dimension }) => {
    dimension.getEntitiesAtBlockLocation(block.location).forEach(_ => _.teleport(player.location));
});
