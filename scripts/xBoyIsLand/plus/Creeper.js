import { world } from "@minecraft/server";
world.beforeEvents.explosion.subscribe((event) => {
    event.setImpactedBlocks([]);
});
