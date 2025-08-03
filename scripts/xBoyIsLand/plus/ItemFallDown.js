import Chunk_Boundary_Point from '../../lib/xboyTools/math/chunk';
import kyj from '../../lib/xboyTools/孔乙己/回字的左旋写法';
import { system, world } from '@minecraft/server';
import xIsLand from "../MangeIsLand/xIsLand";
const the_end = world.getDimension("the end");
const nether = world.getDimension("nether");
const overworld = world.getDimension("overworld");
world.afterEvents.playerBreakBlock.subscribe(({ player: player, block: block, dimension: dimension }) => {
    if (player?.location === undefined)
        return;
    const { x, y, z } = player.location;
    dimension.getEntitiesAtBlockLocation(block.location).forEach(_ => _.typeId === "minecraft:player" || _.teleport({ x, y: y + 1.75, z }));
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
system.runInterval(() => {
    overworld
        .getEntities({ type: 'minecraft:chest_boat' })
        .forEach(chestBoat => { chestBoat.location.y < -509 ? chestBoat.teleport(getIslandLocationFromIndex(getIndexFromLocation(chestBoat.location))) : false; });
    overworld
        .getEntities({ type: 'minecraft:item' })
        .forEach(chestBoat => { chestBoat.location.y < -509 ? chestBoat.teleport(getIslandLocationFromIndex(getIndexFromLocation(chestBoat.location))) : false; });
    overworld
        .getPlayers()
        .forEach((player) => {
        if (player?.location === undefined)
            return;
        if (player.location.y < -528) {
            const xz = kyj.index2pos(xIsLand.GetIsPlayerScore(player.name));
            if (xIsLand.GetIsPlayerScore(player.name) <= 0)
                player.sendMessage('[摆烂空岛] 还没有自己的岛\u000a输入 ~island空格+岛屿名\u000a以便于创建自己的岛屿' + xIsLand.GetIsPlayerScore(player.name));
            else {
                player.teleport({ x: xz[0] * 144 + 74, y: 40, z: xz[1] * 144 + 74 }, { dimension: nether });
                system.runTimeout(() => player.runCommand(`setblock ${xz[0] * 144 + 74} ${38} ${xz[1] * 144 + 74} minecraft:netherrack`), 8);
            }
        }
        if (player.location.y > 513) {
            const xz = kyj.index2pos(xIsLand.GetIsPlayerScore(player.name));
            if (xIsLand.GetIsPlayerScore(player.name) <= 0)
                player.sendMessage('[摆烂空岛] 还没有自己的岛\u000a输入 ~island空格+岛屿名\u000a以便于创建自己的岛屿' + xIsLand.GetIsPlayerScore(player.name));
            else {
                player.teleport({ x: xz[0] * 144 + 74, y: 40, z: xz[1] * 144 + 74 }, { dimension: the_end });
                system.runTimeout(() => player.runCommand(`setblock ${xz[0] * 144 + 74} ${38} ${xz[1] * 144 + 74} minecraft:end_stone`), 8);
            }
        }
    });
    nether
        .getPlayers()
        .forEach((player) => {
        if (player?.location === undefined)
            return;
        if (player.location.y > -5)
            return;
        const xz = kyj.index2pos(xIsLand.GetIsPlayerScore(player.name));
        if (xIsLand.GetIsPlayerScore(player.name) <= 0)
            player.sendMessage('[摆烂空岛] 还没有自己的岛\u000a输入 ~island空格+岛屿名\u000a以便于创建自己的岛屿' + xIsLand.GetIsPlayerScore(player.name));
        else {
            player.teleport({ x: xz[0] * 144 + 74, y: -490, z: xz[1] * 144 + 74 }, { dimension: overworld });
        }
    });
});
