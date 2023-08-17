import Chunk_Boundary_Point from '../../lib/xboyTools/math/chunk';
import kyj from '../../lib/xboyTools/孔乙己/回字的左旋写法';
import { EffectTypes } from '@minecraft/server';
import xIsLand from "../MangeIsLand/xIsLand";
world.events.blockBreak.subscribe(({ player: player, block: block, dimension: dimension }) => {
    dimension.getEntitiesAtBlockLocation(block.location).forEach(_ => _.teleport(player.location));
});
const getIndexFromLocation = (postion) => {
    let [x, z] = Chunk_Boundary_Point.x92D([postion.x, postion.z]);
    [x, z] = [x / 144, z / 144];
    const index = kyj.pos2index([x, z]);
    return index;
};
console.error(EffectTypes.getAll());
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
        .forEach((player, xz) => {
        player.location.y < -528
            ? (player.getEffects().forEach(_ => { player.removeEffect(_.typeId); }),
                player.addLevels(-10),
                (xz = kyj.index2pos(xIsLand.GetIsPlayerScore(player.name)),
                    xIsLand.GetIsPlayerScore(player.name) <= 0
                        ? player.sendMessage('[摆烂空岛] 还没有自己的岛\u000a输入 ~island空格+岛屿名\u000a以便于创建自己的岛屿')
                        : player.teleport({ x: xz[0] * 144 + 74, y: -490, z: xz[1] * 144 + 74 })))
            : false;
    });
    world.getDimension("overworld")
        .getPlayers()
        .forEach(player => { player.location.y > 513 ? player.teleport({ x: player.location.x, y: 200, z: player.location.z }, { dimension: world.getDimension('the end') }) : false; });
});
