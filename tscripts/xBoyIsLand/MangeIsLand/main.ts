import {Dimension, system, world} from "@minecraft/server";

import   verif from "./verifyDataBase"

import "./test";


const overworld : Dimension = world.getDimension("overworld");
const nether    = world.getDimension("nether");
const log       = (...args: any[]) => console.log(args);
// import { initConsole }  from '../../lib/RGB39/tellraw-console.js';//RGB牌控制台输出-Powered by RGB39
// const tConsole  = initConsole(nether);//来自地狱的圣言哈哈哈哈哈哈哈艹
      // tConsole.injectConsole();



// system.runInterval(() => {  /*我()了，这也是一种不（）*/  tConsole.update()});


;;;"依赖初始化完毕";;;
let cont = 0;
system.runInterval(()=>{
      if(cont<4){
      verif()
      cont++;
      }

})