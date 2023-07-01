const shears = ['minecraft:leaves', 'minecraft:leaves2', 'minecraft:azalea_leaves', 'minecraft:mangrove_leaves', 'minecraft:cherry_leaves', 'minecraft:bamboo', 'minecraft:grass', 'minecraft:water'];
const list = new Set();
let count = 0;
world.events.tick.subscribe(() => {
    if (++count < 2)
        return;
    count = 0;
    list.clear();
    const players = world.getPlayers();
    players.forEach((player) => {
        player.removeTag('mayfly');
        const { x, y, z } = player.location;
        const r = 6;
        const d = player.dimension;
        const b = { 'x': 0, 'y': 0, 'z': 0 };
        _x: for (let xOff = x - r; xOff !== x + r; ++xOff)
            _y: for (let yOff = (y - r) >= -512 ? (y - r) : -512; yOff <= y + r; ++yOff)
                _z: for (let zOff = z - r; zOff !== z + r; ++zOff)
                    if (d.getBlock({ 'x': xOff, 'y': yOff, 'z': zOff }).typeId != 'minecraft:air')
                        if (shears.includes(d.getBlock({ 'x': xOff, 'y': yOff, 'z': zOff }).typeId)) {
                            player.addTag('mayfly');
                            player.addTag('mayfly2');
                            continue _x;
                        }
    });
    world.getDimension('overworld').runCommandAsync('ability @a[tag=mayfly] mayfly true');
    world.getDimension('overworld').runCommandAsync('ability @a[tag=!mayfly] mayfly false');
    world.getDimension('overworld').runCommandAsync('gamemode a @a[tag=!mayfly,tag=mayfly2,m=s]');
    world.getDimension('overworld').runCommandAsync('gamemode s @a[tag=!mayfly,tag=mayfly2,m=a]');
    world.getDimension('overworld').runCommandAsync('tag @a[tag=!mayfly,tag=mayfly2] remove mayfly2');
});
export {};
