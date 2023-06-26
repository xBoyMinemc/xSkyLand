import Chunk_Boundary_Point from '../../lib/xboyTools/math/chunk';
import kyj from '../../lib/xboyTools/孔乙己/回字的左旋写法';
world.events.blockBreak.subscribe(({ player: player, block: block, dimension: dimension }) => {
    dimension.getEntitiesAtBlockLocation(block.location).forEach(_ => _.teleport(player.location));
});
const getIndexFromLocation = (postion) => {
    let [x, z] = Chunk_Boundary_Point.x92D([postion.x, postion.z]);
    [x, z] = [x / 144, z / 144];
    const index = kyj.pos2index([x, z]);
    return index;
};
const getIslandLocationFromIndex = (index) => {
    const [x, z] = kyj.index2pos(index);
    return { x: x * 144 + 74, y: -490, z: z * 144 + 74 };
};
world.events.tick.subscribe(() => {
    world.getDimension("overworld")
        .getEntities({ type: 'minecraft:chest_boat' })
        .forEach(chestBoat => { chestBoat.location.y < -509 ? chestBoat.teleport(getIslandLocationFromIndex(getIndexFromLocation(chestBoat.location))) : false; });
    world.getDimension("overworld")
        .getPlayers()
        .forEach(player => { player.location.y < -528 ? player.teleport({ x: player.location.x, y: 200, z: player.location.z }, { dimension: world.getDimension('nether') }) : false; });
    world.getDimension("overworld")
        .getPlayers()
        .forEach(player => { player.location.y > 513 ? player.teleport({ x: player.location.x, y: 200, z: player.location.z }, { dimension: world.getDimension('the end') }) : false; });
});
