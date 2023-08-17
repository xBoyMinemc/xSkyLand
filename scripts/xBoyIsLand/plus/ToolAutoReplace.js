world.events.blockBreak.subscribe(({ player: player, block: block, dimension: dimension }) => {
    dimension.getEntitiesAtBlockLocation(block.location).forEach(_ => _.teleport(player.location));
});
export {};
