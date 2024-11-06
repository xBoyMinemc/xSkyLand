import { world } from "@minecraft/server";
world.beforeEvents.explosion.subscribe(({ setImpactedBlocks: setImpactedBlocks }) => {
    setImpactedBlocks([]);
});
