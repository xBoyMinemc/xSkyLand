// import { world } from "@minecraft/server";

const overworld = world.getDimension("overworld");
const nether = world.getDimension("nether");
const the_end = world.getDimension("the end");

var tps = 0
var s5Time = tps
var time = (""+Date.now()).slice(-4,-3)
var timea = Date.now()
var timeb = Date.now()
var msptArray = []
var mspta = 100
var msptb = 0
var mspt  = 0




const tpsMspt = function(){
tps++
mspt = Date.now() - timea
msptArray.push(mspt)
if(mspt > msptb){msptb = mspt}
if(mspt < mspta){mspta = mspt}
timea = Date.now()



let bbb = (""+Date.now()).slice(-4,-3)
if(bbb != time){
    s5Time++
    time = (""+Date.now()).slice(-4,-3)
    try{
    //  overworld.runCommandAsync(`title @a[tag=tps] actionbar §e§lTPS:§3${tps}§0#§4MSPT:§e${mspta}-${msptb}§0#§4${msptArray.join(",")}`);
     overworld.runCommandAsync(`title @a[tag=tps] actionbar §e§lTPS:§3${tps}§0#`);
     overworld.runCommandAsync(`scoreboard players set tps tps ${tps}`);
   // console.warn("####TPS",tps)
    }catch(err){
     //眼不见心不烦
    }//try
tps = 0
mspta = 100
msptb = 0
mspt  = 0
msptArray = []
}
timea = Date.now()

if(s5Time > 4){
s5Time = 0
 try{
     overworld.runCommandAsync(`scoreboard players operation tps entity = tps0 entity`);
     overworld.runCommandAsync(`scoreboard players set tps0 entity 0`);
     overworld.runCommandAsync(`execute as @e[type=!item] run scoreboard players add tps0 entity 1`);
    
     overworld.runCommandAsync(`scoreboard players operation tps item = tps0 item`);
     overworld.runCommandAsync(`scoreboard players set tps0 item 0`);
    
     overworld.runCommandAsync(`execute as @e[type=item] run scoreboard players add tps0 item 1`);
     }catch(err){}
    }
}
export default tpsMspt
