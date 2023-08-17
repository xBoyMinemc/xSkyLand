const Chunk_Boundary_Point = {
    x2D: function (xz) {
        return xz.map(i => {
            i = +i.toFixed(0);
            i = i < 0 ? (i % 16 == -0 ? +i : i - i % 16 - 16) : i - i % 16;
            return i;
        });
    },
    x3D: function (xyz) {
        return xyz.map(i => {
            i = +i.toFixed(0);
            i = i < 0 ? (i % 16 == -0 ? +i : i - i % 16 - 16) : i - i % 16;
            return i;
        });
    },
    x2D_Get_All: function (xz) {
        return [xz, [xz[0] + 16, xz[1]], [xz[0] + 16, xz[1] + 16], [xz[0], xz[1] + 16]];
    },
    x62D: function (xz) {
        return xz.map(i => {
            i = +i.toFixed(0);
            i = i < 0 ? (i % 96 == -0 ? +i : i - i % 96 - 96) : i - i % 96;
            return i;
        });
    },
    x92D: function (xz) {
        return xz.map(i => {
            i = +i.toFixed(0);
            i = i < 0 ? (i % 144 == -0 ? +i : i - i % 144 - 144) : i - i % 144;
            return i;
        });
    }
};
const Chunk_Identify = {
    slimeChunk: function (x, z) {
        let chunkX = Math.floor(x / 16), chunkZ = Math.floor(z / 16);
        let s = (chunkX * 0x1f1f1f1f ^ chunkZ) >>> 0;
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
            return true;
        else
            return false;
    }
};
export default Chunk_Boundary_Point;
