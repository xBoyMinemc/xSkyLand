let count = 0;
world.events.tick.subscribe(() => {
    try {
        if (++count < 5)
            return;
        count = 0;
        const players = world.getPlayers();
        players.forEach((player) => {
            if (!player.hasTag('slime'))
                return;
            const cx = Math.floor(player.location.x / 16), cz = Math.floor(player.location.z / 16);
            let s = (cx * 0x1f1f1f1f ^ cz) >>> 0;
            let m = 1 + Math.imul((s ^ s >>> 30), 0x6c078965) >>> 0;
            s = s & 0x80000000 | m & 0x7fffffff;
            for (let i = 2; i < 398; i++)
                m = i + Math.imul((m ^ m >>> 30), 0x6c078965) >>> 0;
            m ^= (s >>> 1) ^ (s & 1 ? 0x9908b0df : 0x0);
            m >>>= 0;
            m ^= m >>> 11;
            m ^= (m << 7 & 0x9d2c5680) >>> 0;
            m ^= (m << 15 & 0xefc60000) >>> 0;
            m ^= m >>> 18;
            if (!((m >>> 0) % 10))
                player.runCommand(`title "${player.name}" actionbar §a当前所在区块为史莱姆区块`);
            else
                player.runCommand(`title "${player.name}" actionbar 当前所在区块不是史莱姆区块`);
        });
    }
    catch (error) {
    }
});
world.events.chat.subscribe(({ message: message, sender: sender }) => {
    if (message === "~island slime" || message === "史莱姆区块")
        sender.hasTag('slime') ? sender.removeTag('slime') : sender.addTag('slime');
});
export {};
