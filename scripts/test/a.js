import { world } from "@minecraft/server";


world.events.tick.subscribe((_)=>{
    Array.from(world.getDimension("overworld").getEntities()).forEach((_)=>{
        if(!_.getComponent("minecraft:health").current)
        console.error(_.getComponent("minecraft:health").current)
   
    })
});

















