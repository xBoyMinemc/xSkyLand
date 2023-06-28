// import { world } from "@minecraft/server";

const skeleton = function(){
    for(let i = 0;i<5;i++){
        try{
            world.getDimension("overworld").runCommandAsync(`execute @e[type=skeleton] ~ ~ ~ detect ~ ~-1 ~ hopper ${i} event entity @s xboycraft:pushable`)
        }catch(err){
            // world.getDimension("overworld").runCommandAsync(`me ${err}`)
        }
        try{
            world.getDimension("overworld").runCommandAsync(`execute @e[type=skeleton] ~ ~ ~ detect ~ ~ ~ hopper ${i} event entity @s xboycraft:pushable`)
        }catch(err){
            // world.getDimension("overworld").runCommandAsync(`me ${err}`)
        }
    }
    
}

var ticktime = 0;
world.events.tick.subscribe(() => {
    
        ticktime++;
        if (ticktime < 20) return;
        ticktime = 0; 
    
    skeleton()
})