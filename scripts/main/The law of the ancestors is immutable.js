import { system } from "@minecraft/server";
export class Location {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
export class BlockLocation extends Location {
    blocksBetween(BlockLocation) {
        const BlockLocations = [];
        x: for (let xOff = this.x - BlockLocation.x; xOff !== 0; xOff > 0 ? --xOff : ++xOff)
            y: for (let yOff = this.y - BlockLocation.y; yOff !== 0; yOff > 0 ? --yOff : ++yOff)
                z: for (let zOff = this.z - BlockLocation.z; zOff !== 0; zOff > 0 ? --zOff : ++zOff)
                    BlockLocations.push({ "x": this.x - xOff, "y": this.y - yOff, "z": this.z - zOff });
        return BlockLocations;
    }
}
export class EventSignal {
    constructor() {
        this.listeners = new Set();
    }
    subscribe(listener) {
        this.listeners.add(listener);
        return listener;
    }
    unsubscribe(listener) {
        this.listeners.delete(listener);
    }
    trigger(ev) {
        this.listeners.forEach((listener) => listener(ev));
    }
}
const tick = new EventSignal();
system.runInterval(() => tick.trigger({ currentTick: system.currentTick }), 1);
const bf = world.beforeEvents;
const af = world.afterEvents;
export const Events = {
    tick: tick,
    beforeChat: bf.chatSend,
    beforeDataDrivenEntityTriggerEvent: bf.dataDrivenEntityTriggerEvent,
    beforeExplosion: bf.explosion,
    beforeItemDefinitionEvent: bf.itemDefinitionEvent,
    beforeItemUse: bf.itemUse,
    beforeItemUseOn: bf.itemUseOn,
    beforePistonActivate: bf.pistonActivate,
    blockBreak: af.blockBreak,
    blockExplode: af.blockExplode,
    blockPlace: af.blockPlace,
    buttonPush: af.buttonPush,
    chat: af.chatSend,
    dataDrivenEntityTriggerEvent: af.dataDrivenEntityTriggerEvent,
    effectAdd: af.effectAdd,
    entityDie: af.entityDie,
    entityHit: af.entityHit,
    entityHurt: af.entityHurt,
    entityRemoved: af.entityRemoved,
    entitySpawn: af.entitySpawn,
    explosion: af.explosion,
    itemDefinitionEvent: af.itemDefinitionEvent,
    itemStartUseOn: af.itemStartUseOn,
    itemStopUseOn: af.itemStopUseOn,
    itemUse: af.itemUse,
    itemUseOn: af.itemUseOn,
    leverActivate: af.leverActivate,
    messageReceive: af.messageReceive,
    pistonActivate: af.pistonActivate,
    playerJoin: af.playerJoin,
    playerLeave: af.playerLeave,
    playerSpawn: af.playerSpawn,
    projectileHit: af.projectileHit,
    weatherChange: af.weatherChange,
    worldInitialize: af.worldInitialize,
};
import { world as _world } from "@minecraft/server";
globalThis.world = Object.assign(_world, { events: Events });
globalThis.Location = Location;
globalThis.BlockLocation = BlockLocation;
