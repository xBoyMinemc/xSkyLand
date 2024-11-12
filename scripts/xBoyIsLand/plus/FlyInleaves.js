import { world, system } from '@minecraft/server';
import { MolangVariableMap } from '@minecraft/server';
const shears = ['minecraft:acacia_leaves', 'minecraft:azalea_leaves', 'minecraft:azalea_leaves_flowered', 'minecraft:birch_leaves', 'minecraft:cherry_leaves', 'minecraft:dark_oak_leaves', 'minecraft:jungle_leaves', 'minecraft:mangrove_leaves', 'minecraft:oak_leaves', 'minecraft:pale_oak_leaves', 'minecraft:spruce_leaves', 'minecraft:bamboo', 'minecraft:grass', 'minecraft:grass_block', 'minecraft:moss_block', 'minecraft:water'];
const list = new Map();
const overworld = world.getDimension('overworld');
let count = 0;
system.runInterval(() => {
    if (++count < 2)
        return;
    count = 0;
    const players = overworld.getPlayers();
    players.forEach((player) => {
        const overworld = player.dimension;
        let { x: xa, y: ya, z: za } = player.location;
        xa = Math.floor(xa);
        ya = Math.floor(ya);
        za = Math.floor(za);
        const r = 6;
        const d = player.dimension;
        const b = { 'x': 0, 'y': 0, 'z': 0 };
        let mayfly = false;
        _x: for (b.x = xa - r + 0.5; b.x <= xa + r + 0.5; ++b.x)
            _y: for (b.y = 0.5 + (ya - r) >= -512 ? (ya - r) <= 512 ? (ya - r) : 512 : -512; b.y <= ya + r; ++b.y)
                _z: for (b.z = za - r + 0.5; b.z <= za + r + 0.5; ++b.z) {
                    const bI = d.getBlock(b)?.typeId;
                    if (bI === 'minecraft:air')
                        continue;
                    if (bI === 'minecraft:portal') {
                        player.sendMessage('地狱暂时没想好怎么处理地狱门');
                        d.getBlock(b).setType('minecraft:air');
                        continue;
                    }
                    if (mayfly)
                        continue;
                    if (!shears.includes(bI))
                        continue;
                    if (!list.has(player.id))
                        player.runCommandAsync('ability @s mayfly true');
                    list.set(player.id, 30);
                    mayfly = true;
                    if (bI === 'minecraft:bamboo' || bI === 'minecraft:sweet_berry_bush') {
                        let rm = Math.random();
                        break _x;
                        while ((rm -= 0.3) > 0) {
                            bI === 'minecraft:bamboo'
                                ?
                                    d.spawnParticle('minecraft:endrod', b, new MolangVariableMap())
                                : 0;
                            bI === 'minecraft:sweet_berry_bush'
                                ?
                                    d.spawnParticle('minecraft:endrod', b, new MolangVariableMap())
                                : 0;
                        }
                    }
                }
        if (list.has(player.id)) {
            const time = list.get(player.id);
            if (time <= 0) {
                list.delete(player.id);
                player.runCommandAsync('ability @s[m=!c] mayfly false');
                player.runCommandAsync('gamemode a @s[m=s]');
                player.runCommandAsync('gamemode s @s[m=a]');
            }
            else {
                if (time < 30)
                    player.onScreenDisplay.setActionBar('--' + time + '--');
                list.set(player.id, time - 1);
            }
        }
    });
});
