import entityDeadByHurt from "./entityDeadByHurt";
import { fishingHookSpawned, fishingHookDespawned } from "./fishingHookSpawned";
import playerJoined from "./playerJoined";
import playerJoining from "./playerJoining";
export default (world) => {
    world.events.entityDeadByHurt = entityDeadByHurt;
    world.events.fishingHookSpawned = fishingHookSpawned;
    world.events.fishingHookDespawned = fishingHookDespawned;
    world.events.playerJoined = playerJoined;
    world.events.playerJoining = playerJoining;
};
