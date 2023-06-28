import {
    // world,BlockLocation,
     MinecraftBlockTypes} from "@minecraft/server";

const cache = {};
world.events.playerJoin.subscribe(event=>{
    cache[event.player]={dimension:event.player.dimension}
})
try{

world.events.beforeChat.subscribe((event)=>{
    const _ = event.sender;
    console.log(cache[_])
    if(!_.hasTag("op"))return;
    event.message==="wd"?
    (event.cancel=true,_.hasTag("wd"))?(_.removeTag("wd"),_.sendMessage("神奇小木斧已关闭")):(_.addTag("wd"),_.sendMessage("神奇小木斧已开启"))
    :0
})

// //选A点
// world.events.beforeItemUse.subscribe(event=>{
//     // if(!event.source.hasTag("wd"))return;
//     // cache[event.source]
//     // event.source.

// console.error("wooden_axe==> A")
// })
//选B点
world.events.beforeItemUseOn.subscribe(event=>{
    const _ = event.source;
    if(!(_.hasTag("wd")&&_.getComponent("minecraft:inventory").container.getItem(_.selectedSlot).typeId==="minecraft:wooden_axe"))return;
    if(_.isSneaking){
        cache[_]["B"]=event.blockLocation;
        _.sendMessage("wooden_axe==> B")
        console.error("wooden_axe==> B")

    }else{
        cache[_]["A"]=event.blockLocation;
        _.sendMessage("wooden_axe==> A")
        console.error("wooden_axe==> A")
    }
})

// world.events.entityHit.subscribe(event=>{

//     console.error("wooden_axe==> C")
// })

//功能
world.events.beforeChat.subscribe((event)=>{
    const _ = event.sender;
    const msg = event.message;
    if(!(_.hasTag("op")&&_.hasTag("wd")&&msg.startsWith("wd ")))return;
    const avg = msg.split(" ");
    avg[1]==="fill"?(
        event.cancel=true,
        cache[_]["A"].blocksBetween(cache[_]["B"]).forEach(
            BlockLoc=>
                cache[_]["dimension"].getBlock(BlockLoc).setType(MinecraftBlockTypes.get(_.getComponent("minecraft:inventory").container.getItem(_.selectedSlot).typeId))
        )
    ):0;
})



}catch(err){
    console.error(err)
}





console.error("wooden_axe加载成功")
