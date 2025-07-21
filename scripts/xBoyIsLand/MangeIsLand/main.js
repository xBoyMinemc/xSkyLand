import { system, world } from "@minecraft/server";
import verif from "./verifyDataBase";
import "./test";
const overworld = world.getDimension("overworld");
const nether = world.getDimension("nether");
const log = (...args) => console.log(args);
;
;
;
"依赖初始化完毕";
;
;
let cont = 0;
system.runInterval(() => {
    if (cont < 4) {
        verif();
        cont++;
    }
});
