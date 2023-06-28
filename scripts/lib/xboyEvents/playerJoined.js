import EventSignal from "./EventSignal";
import { world, system } from "@minecraft/server";
const debug = !false;
const runCmd = (() => {
    const overworld = world.getDimension("minecraft:overworld");
    return (cmd) => { overworld.runCommandAsync(cmd); };
})();
class PlayerJoinedEventSignal extends EventSignal {
}
class PlayerJoinedEvent {
    player;
    constructor(player) {
        Object.defineProperty(this, "player", {
            value: player,
            writable: false
        });
    }
    kickPlayer() {
        this.player.dimension.runCommandAsync(`kick "${this.player.name}"`);
    }
}
const signal = new PlayerJoinedEventSignal();
const joiningPlayers = new Set();
const ticking = () => {
    system.run(ticking);
    if (joiningPlayers.size === 0)
        return;
    Array.from(world.getPlayers()).forEach(pl => {
        if (joiningPlayers.has(pl)) {
            fireEvent(pl);
            joiningPlayers.delete(pl);
        }
    });
};
const fireEvent = (player) => {
    const event = new PlayerJoinedEvent(player);
    signal.trigger(event);
};
world.events.playerJoin.subscribe((event) => {
    joiningPlayers.add(event.player);
});
system.run(ticking);
export { PlayerJoinedEvent, PlayerJoinedEventSignal, signal as PlayerJoined };
export default signal;
if (debug) {
    signal.subscribe((event) => {
        event.player.runCommandAsync(`me 加入了游戏`);
    });
}
