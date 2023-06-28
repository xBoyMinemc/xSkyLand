import type { World } from "../../main/The law of the ancestors is immutable"
declare const world: World ;

import type { Dimension } from "@minecraft/server";

import   verif from "./verifyDataBase"
import   ScoreBase      from "../../lib/xboyTools/scoreBase/rw.js";
import { initConsole }  from '../../lib/RGB39/tellraw-console.js';//RGB牌控制台输出-Powered by RGB39

import "./test";


const overworld : Dimension = world.getDimension("overworld");
const nether    = world.getDimension("nether");
const log       = (...args: any[]) => console.log(args);
const tConsole  = initConsole(nether);//来自地狱的圣言哈哈哈哈哈哈哈艹
      tConsole.injectConsole();



world.events.tick.subscribe(() => {  /*我()了，这也是一种不（）*/  tConsole.update()});


;;;"依赖初始化完毕";;;
let cont = 0;
world.events.tick.subscribe(()=>{
      if(cont<4){
      verif()
      cont++;
      }

})