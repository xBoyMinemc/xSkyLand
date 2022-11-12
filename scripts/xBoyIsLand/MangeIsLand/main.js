import { world } from "@minecraft/server";
import verif from "./verifyDataBase";
import { initConsole } from '../../lib/RGB39/tellraw-console.js';
import "./test";
const overworld = world.getDimension("overworld");
const nether = world.getDimension("nether");
const log = (...args) => console.log(args);
const tConsole = initConsole(nether);
tConsole.injectConsole();
world.events.tick.subscribe(() => { tConsole.update(); });
;
;
;
"依赖初始化完毕";
;
;
let cont = 0;
world.events.tick.subscribe(() => {
    if (cont < 4) {
        verif();
        cont++;
    }
});
