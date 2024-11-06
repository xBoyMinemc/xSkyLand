// import { world, Player,Entity } from "@minecraft/server"
// import EventSignal from '../lib/xboyEvents/EventSignal'
// class BeforePlayerSleepEventSignal extends EventSignal<BeforePlayerSleepEventSignal>{}
// class BeforePlayerSleepEvent extends BeforePlayerSleepEventSignal {
//     player?: Player | Entity;
//     cancel = false;
// }
// const signal = new BeforePlayerSleepEventSignal();
// world.beforeEvents.itemUse.subscribe(beforeItemUseOnEvent => {
//     let block = beforeItemUseOnEvent.source.dimension.getBlock(beforeItemUseOnEvent.source.location);
//     if(
//        !beforeItemUseOnEvent.source.isSneaking
//     && block?.typeId === "minecraft:bed"
//     && block?.dimension.id === "minecraft:overworld"
//     && world.getTimeOfDay() >= 13000 && world.getTimeOfDay() <= 23456
//     ) {
//         let event = new BeforePlayerSleepEvent;
//         // event.player = Array.from(world.getPlayers({name: beforeItemUseOnEvent.source.nameTag}))[0];
//         event.player = beforeItemUseOnEvent.source;
//         signal.trigger(event);
//         beforeItemUseOnEvent.cancel = event.cancel;
//     }
// });
//
// export {
//     BeforePlayerSleepEventSignal,
//     BeforePlayerSleepEvent,
//     signal as beforePlayerSleep
// }
// export default signal