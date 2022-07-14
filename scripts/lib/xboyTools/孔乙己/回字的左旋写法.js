const xBoyDream = new Map();
const toNegative = (i) => i < 0 ? i : -i;
const toPositive = (i) => i < 0 ? -i : i;
let x = 0, y = 0;
const xy = [-1, 3];
const pos2index = (xy) => {
    x = xy[0], y = xy[1];
    if (x === y && x <= 0)
        return (x * 2 - 1) ** 2 - 1;
    let inner = 1 + toNegative(toPositive(x) > toPositive(y) ? x : y);
    console.log("inner=>", inner);
    let inBas = (inner * 2 - 1) ** 2;
    console.log("inBas=>", inBas);
    if (x === inner - 1)
        return 1 + inBas + toPositive(-inner - y) - 1;
    if (y === inner - 1)
        return 1 + inBas + toPositive(inner - x) + toPositive((inner - 1) * 2) - 1;
    if (x === -inner + 1)
        return 1 + inBas + toPositive(inner - y) + 2 * toPositive((inner - 1) * 2) - 1;
    if (y === -inner + 1)
        return 1 + inBas + toPositive(-inner - x) + 3 * toPositive((inner - 1) * 2) - 1;
};
console.log(pos2index([0, 0]));
