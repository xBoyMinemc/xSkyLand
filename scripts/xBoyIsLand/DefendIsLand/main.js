import { GameMode, PlayerPermissionLevel, system, world } from '@minecraft/server';
import Chunk_Boundary_Point from '../../lib/xboyTools/math/chunk';
import kyj from '../../lib/xboyTools/孔乙己/回字的左旋写法';
import config from '../config';
import { GetIsPlayerInIsLandScore, GetIsPlayerScore } from './rw';
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
system.runInterval(() => {
    overworld.getPlayers({}).forEach((player) => {
        const per = Permission(player.name, player.location);
        if (player.playerPermissionLevel === PlayerPermissionLevel.Operator)
            return;
        if (per === '000') {
            player.setGameMode(GameMode.Spectator);
        }
        if (per[2] === ('1') && player.getGameMode() !== GameMode.Survival)
            player.setGameMode(GameMode.Survival);
        if (per === '110' && player.getGameMode() !== GameMode.Survival)
            player.setGameMode(GameMode.Survival);
        if (per === '100' && player.getGameMode() !== GameMode.Spectator)
            player.setGameMode(GameMode.Spectator);
    });
});
