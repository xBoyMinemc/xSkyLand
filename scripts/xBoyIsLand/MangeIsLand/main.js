import { world } from "mojang-minecraft";
import verif from "./verifyDataBase";
import { initConsole } from '../../lib/RGB39/tellraw-console.js'; //RGB牌控制台输出-Powered by RGB39
const overworld = world.getDimension("overworld");
const nether = world.getDimension("nether");
const log = (...args) => console.log(args);
const tConsole = initConsole(nether); //来自地狱的圣言哈哈哈哈哈哈哈艹
tConsole.injectConsole();
world.events.tick.subscribe(() => { /*我()了，这也是一种不（）*/ tConsole.update(); });
;
;
;
"依赖初始化完毕";
;
;
// world.events.beforeChat.subscribe(()=>{
verif();
// })
