import Chunk_Boundary_Point from '../../lib/xboyTools/math/chunk';
import kyj from '../../lib/xboyTools/孔乙己/回字的左旋写法';
import config from '../config';
import { GetIsPlayerScore, GetIsPlayerInIsLandScore } from './rw';
const overworld = world.getDimension('overworld');
const Permission = (playerName, postion) => {
    const UID = GetIsPlayerScore(playerName);
    if (UID < 0)
        return '000';
    let [x, z] = Chunk_Boundary_Point.x92D([postion.x, postion.z]);
    [x, z] = [x / 144, z / 144];
    const index = kyj.pos2index([x, z]);
    if (index < (config.HoldRadius * 2 + 1) ** 2)
        return '000';
    if (UID == index)
        return '111';
    const per = GetIsPlayerInIsLandScore(playerName, index);
    if (per <= 0)
        return '000';
    return per.toString(2);
};
export { Permission };
world.events.tick.subscribe((_) => {
    world.getPlayers({}).forEach((player) => {
        let per = Permission(player.name, player.location);
        if (player.isOp() || player.name === "Xboy minemc")
            return;
        if (per === '000') {
            player.runCommandAsync('gamemode spectator @s[m=a]');
            player.runCommandAsync('gamemode spectator @s[m=s]');
            player.runCommandAsync('gamemode spectator @s[m=c]');
        }
        if (per.endsWith('1'))
            player.runCommandAsync('gamemode survival @s[m=!survival]');
        if (per === '110')
            player.runCommandAsync('gamemode survival @s[m=!survival]');
        if (per === '100')
            player.runCommandAsync('gamemode adventure @s[m=!adventure]');
    });
});
