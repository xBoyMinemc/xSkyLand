// import { world } from "@minecraft/server"
import type { World } from "../main/The law of the ancestors is immutable"
declare const world: World ;
import x from "../server-plus/index"

       x(world)
world.events.beforePlayerSleep.subscribe((event)=>event.player.runCommandAsync("me zzz 睡大觉"))












