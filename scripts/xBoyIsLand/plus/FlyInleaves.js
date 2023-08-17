import { MolangVariableMap } from '@minecraft/server';
const shears = ['minecraft:leaves', 'minecraft:leaves2', 'minecraft:azalea_leaves', 'minecraft:mangrove_leaves', 'minecraft:cherry_leaves', 'minecraft:bamboo', 'minecraft:grass', 'minecraft:water'];
const list = new Set();
const overworld = world.getDimension('overworld');
let count = 0;
world.events.tick.subscribe(() => {
    if (++count < 2)
        return;
    count = 0;
    list.clear();
    const players = overworld.getPlayers();
    players.forEach((player) => {
        const overworld = player.dimension;
        player.removeTag('mayfly');
        let { x: xa, y: ya, z: za } = player.location;
        xa = Math.floor(xa);
        ya = Math.floor(ya);
        za = Math.floor(za);
        const r = 6;
        const d = player.dimension;
        const b = { 'x': 0, 'y': 0, 'z': 0 };
        let f = true;
        _x: for (b.x = xa - r + 0.5; b.x <= xa + r + 0.5; ++b.x)
            _y: for (b.y = 0.5 + (ya - r) >= -512 ? (ya - r) <= 512 ? (ya - r) : 512 : -512; b.y <= ya + r; ++b.y)
                _z: for (b.z = za - r + 0.5; b.z <= za + r + 0.5; ++b.z) {
                    const bI = d.getBlock(b)?.typeId;
                    if (bI !== 'minecraft:air')
                        if (shears.includes(bI)) {
                            if (f) {
                                player.addTag('mayfly');
                                player.addTag('mayfly2');
                                f = false;
                            }
                            if (bI === 'minecraft:bamboo' || bI === 'minecraft:sweet_berry_bush') {
                                let rm = Math.random();
                                while ((rm -= 0.3) > 0) {
                                    bI === 'minecraft:bamboo'
                                        ?
                                            d.spawnParticle('xboycraft:green_light_point', b, new MolangVariableMap())
                                        : 0;
                                    bI === 'minecraft:sweet_berry_bush'
                                        ?
                                            d.spawnParticle('xboycraft:red_light_point', b, new MolangVariableMap())
                                        : 0;
                                }
                            }
                        }
                }
    });
    overworld.runCommandAsync('ability @a[tag=mayfly] mayfly true');
    overworld.runCommandAsync('ability @a[tag=mayfly] mayfly true');
    overworld.runCommandAsync('ability @a[m=c] mayfly true');
    overworld.runCommandAsync('gamemode a @a[tag=!mayfly,tag=mayfly2,m=s]');
    overworld.runCommandAsync('gamemode s @a[tag=!mayfly,tag=mayfly2,m=a]');
    overworld.runCommandAsync('tag @a[tag=!mayfly,tag=mayfly2] remove mayfly2');
});
