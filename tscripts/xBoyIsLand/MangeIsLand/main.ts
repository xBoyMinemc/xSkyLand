import { Dimension, world } from "mojang-minecraft"
import { ActionFormData } from "mojang-minecraft-ui"

import   a from "./verifyDataBase"
import   ScoreBase      from "../../lib/xboyTools/scoreBase/rw.js";
import { initConsole }  from '../../lib/RGB39/tellraw-console.js';//RGB牌控制台输出-Powered by RGB39



const overworld : Dimension = world.getDimension("overworld");
const nether    = world.getDimension("nether");
const log       = (...args: any[]) => console.log(args);
const tConsole  = initConsole(nether);//来自地狱的圣言哈哈哈哈哈哈哈艹
      tConsole.injectConsole();



world.events.tick.subscribe(() => {  /*我()了，这也是一种不（）*/  tConsole.update()});


;;;"依赖初始化完毕";;;


world.events.beforeChat.subscribe(()=>{
      a()
})