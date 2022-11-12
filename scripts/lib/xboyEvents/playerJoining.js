import EventSignal from "./EventSignal";
import { world } from "@minecraft/server";
const debug = false;
const runCmd = (() => {
    const overworld = world.getDimension("minecraft:overworld");
    return (cmd) => { overworld.runCommandAsync(cmd); };
})();
class PlayerJoiningEventSignal extends EventSignal {
}
class PlayerJoiningEvent {
    player;
    constructor(player) {
        Object.defineProperty(this, "player", {
            value: player,
            writable: false,
            enumerable: true
        });
    }
    set cancel(bool) {
        if (bool) {
            runCmd(`kick "${this.player.name}"`);
        }
    }
}
const signal = new PlayerJoiningEventSignal();
const fireEvent = (player) => {
    const event = new PlayerJoiningEvent(player);
    signal.trigger(event);
};
world.events.playerJoin.subscribe((event) => {
    fireEvent(event.player);
});
export { PlayerJoiningEvent, PlayerJoiningEventSignal, signal as playerJoining };
export default signal;
if (debug) {
    const send = (msg) => { runCmd(`say ${msg}`); };
    signal.subscribe((event) => {
        send(`${event.player.name} 正在加入游戏`);
    });
}
