import entityDeadByHurt from "./entityDeadByHurt";
import { fishingHookSpawned, fishingHookDespawned } from "./fishingHookSpawned";
import beforePlayerSleep from "./beforePlayerSleep";
export default (world) => {
    world.events.entityDeadByHurt = entityDeadByHurt;
    world.events.fishingHookSpawned = fishingHookSpawned;
    world.events.fishingHookDespawned = fishingHookDespawned;
    world.events.beforePlayerSleep = beforePlayerSleep;
};
