import type { World } from '../../main/The law of the ancestors is immutable'
declare const world: World ;

world.events.beforeExplosion.subscribe(({setImpactedBlocks:setImpactedBlocks})=>{
    setImpactedBlocks([])
})
