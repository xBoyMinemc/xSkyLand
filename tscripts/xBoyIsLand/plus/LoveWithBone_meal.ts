import {
    world, system,
    BlockVolume
} from '@minecraft/server'


// bone_meal 使用骨粉点苔藓块的时候将5x5的圆石转变为石头，在苔藓块被骨灰点的事件结束后再把没转变的圆石变回石头
world.beforeEvents.itemUseOn.subscribe(event=>{
    const {source:player, itemStack:item} = event
    if(item.typeId==='minecraft:bone_meal'){
        const breakBlock = player.getBlockFromViewDirection({maxDistance:8}).block
        const dimenion = breakBlock.dimension
        if(breakBlock?.typeId!=='minecraft:moss_block')return 
        const {x,y,z} = breakBlock.location
        const getBlockLocation = breakBlock.dimension.getBlocks(new BlockVolume({x:x-3,y:y-3,z:z-3},{x:x+3,y:y+3,z:z+3}),{includeTypes:["minecraft:cobblestone"]})
        const blocks = []
        system.runTimeout(()=>{ 
            const gen = getBlockLocation.getBlockLocationIterator()
            let blockLocation = null;

            while(blockLocation = gen.next().value){
                
                if(dimenion.getBlock(blockLocation).above().isAir)
                blocks.push(blockLocation)
            }

            blocks.forEach(blockLocation=>{
                dimenion.getBlock(blockLocation).setType("minecraft:stone")
            })
        },0)

    }
})