import { world, system } from '@minecraft/server';
import { MolangVariableMap } from '@minecraft/server';
const overworld = world.getDimension('overworld');
const nether = world.getDimension('nether');
const shears = ['minecraft:acacia_leaves', 'minecraft:azalea_leaves', 'minecraft:azalea_leaves_flowered', 'minecraft:birch_leaves', 'minecraft:cherry_leaves', 'minecraft:dark_oak_leaves', 'minecraft:jungle_leaves', 'minecraft:mangrove_leaves', 'minecraft:oak_leaves', 'minecraft:pale_oak_leaves', 'minecraft:spruce_leaves', 'minecraft:bamboo', 'minecraft:grass', 'minecraft:grass_block', 'minecraft:moss_block', 'minecraft:sweet_berry_bush', 'minecraft:water'];
const list = new Map();
world.afterEvents.playerLeave.subscribe(({ playerId }) => {
    list.delete(playerId);
});
system.runInterval(() => {
    const players = overworld.getPlayers();
    players.forEach((player) => {
        if (player?.location === undefined)
            return;
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
                    const block = d.getBlock(b);
                    const bI = block?.typeId;
                    if (bI === 'minecraft:air')
                        continue;
                    if (bI === 'minecraft:portal') {
                        player.sendMessage('地狱暂时没想好怎么处理地狱门');
                        block.setType('minecraft:air');
                        continue;
                    }
                    if (mayfly)
                        continue;
                    if (!shears.includes(bI))
                        continue;
                    if (!list.has(player.id))
                        player.runCommand('ability @s mayfly true');
                    list.set(player.id, 30);
                    mayfly = true;
                    continue;
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
                player.runCommand('ability @s[m=!c] mayfly false');
                player.runCommand('gamemode a @s[m=s]');
                player.runCommand('gamemode s @s[m=a]');
            }
            else {
                if (time < 30)
                    player.onScreenDisplay.setActionBar('--' + time + '--');
                list.set(player.id, time - 1);
            }
        }
    });
    {
        const players = nether.getPlayers();
        players.forEach((player) => {
            if (player?.location === undefined)
                return;
            let { x: xa, y: ya, z: za } = player.location;
            xa = Math.floor(xa);
            ya = Math.floor(ya);
            za = Math.floor(za);
            const r = 6;
            const d = player.dimension;
            const b = { 'x': 0, 'y': 0, 'z': 0 };
            let mayfly = false;
            _x: for (b.x = xa - r + 0.5; b.x <= xa + r + 0.5; ++b.x)
                _y: for (b.y = 0.5 + (ya - r) >= 0 ? (ya - r) <= 127 ? (ya - r) : 127 : 0; b.y <= ya + r; ++b.y)
                    _z: for (b.z = za - r + 0.5; b.z <= za + r + 0.5; ++b.z) {
                        const block = d.getBlock(b);
                        const bI = block?.typeId;
                        if (bI === 'minecraft:air')
                            continue;
                        if (bI === 'minecraft:portal') {
                            player.sendMessage('地狱暂时没想好怎么处理地狱门');
                            block.setType('minecraft:air');
                            continue;
                        }
                        if (mayfly)
                            continue;
                        if (!shears.includes(bI))
                            continue;
                        if (!list.has(player.id))
                            player.runCommand('ability @s mayfly true');
                        list.set(player.id, 30);
                        mayfly = true;
                        continue;
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
                    player.runCommand('ability @s[m=!c] mayfly false');
                    player.runCommand('gamemode a @s[m=s]');
                    player.runCommand('gamemode s @s[m=a]');
                }
                else {
                    if (time < 30)
                        player.onScreenDisplay.setActionBar('--' + time + '--');
                    list.set(player.id, time - 1);
                }
            }
        });
    }
}, 2);
