const xboyList = {
    " c": "amount",
    " count": "amount",
    " a": "amount",
    " amount": "amount",
    " n": "nameTag",
    " name": "nameTag",
    " nametag": "nameTag",
};
const color = {
    valueOf: () => Math.floor(Math.random() * 9) + 1
};
const xInventoryTweaks = function (msg) {
    let { message, sender } = msg;
    let inv = sender;
    let mm = message.toLowerCase();
    if (!(mm.startsWith("r") || mm.startsWith("c")))
        return;
    let mmm = mm.slice(1);
    if (!(mmm == "" || mmm.startsWith(" ")))
        return;
    msg.cancel = true;
    let a = 1;
    let z = -1;
    if (message.startsWith('r')) {
        a = 1;
        z = -1;
        inv = sender;
    }
    if (message.startsWith('R')) {
        a = -1;
        z = 1;
        inv = sender;
    }
    if (message.startsWith('c')) {
        a = 1;
        z = -1;
        inv = sender.getBlockFromViewDirection();
    }
    if (message.startsWith('C')) {
        a = -1;
        z = 1;
        inv = sender.getBlockFromViewDirection();
    }
    let xboy = "xboy";
    if (mmm == "") {
        xboy = "typeId";
    }
    else {
        xboy = xboyList[mmm];
    }
    if (mmm == " help" || mmm == " h") {
        let CMD = "cmd";
        let By = "By";
        if (true) {
            CMD = "命令示例";
            By = "分类依据";
        }
        Object.keys(xboyList).forEach((key) => {
            msg / sender.sendMessage(`|_____§r§l§${+color}#${CMD}：${mm.slice(0, 1) + key} # ${By}：${xboyList[key]} `);
        });
        return;
    }
    if (xboy == "xboy")
        return;
    let items = [];
    const size = inv.getComponent("inventory").container.size;
    const air = undefined;
    for (let i = 0; i < size; i++) {
        let item = inv.getComponent("inventory").container.getItem(i);
        if (!item) {
            continue;
        }
        items.push(item);
    }
    while (items.length < size)
        items.push(undefined);
    let xboySort = function () {
        let l = 0;
        items
            = items
                .reduce((acc, v) => (v ? acc.push(v) : 0, acc), [])
                .sort((x, y) => x[xboy] > y[xboy] ? a : z);
        while (items.length < size)
            items.push(undefined);
        for (let i = 1; i < size; i++) {
            let itemx = items[i - 1];
            let itemy = items[i];
            if (!itemx || !itemy)
                continue;
            if (itemx.amount >= itemx.maxAmount || itemy.amount >= itemy.maxAmount || itemx.amount == 0 || itemy.amount == 0 || itemx.typeId == "" || itemy.typeId == "") {
                continue;
            }
            if (!itemx.isStackableWith(itemy))
                continue;
            if (itemx.amount + itemy.amount <= itemx.maxAmount) {
                l++;
                items[i].amount = itemx.amount + itemy.amount;
                items[i - 1] = air;
                continue;
            }
            ;
            l++;
            items[i - 1].amount = itemx.amount + itemy.amount - 64;
            items[i].amount = 64;
        }
        if (l == 0 || l > 32) {
            return;
        }
        xboySort();
    };
    xboySort();
    let diff = 0;
    items.sort((x, y) => newSort(x[xboy], y[xboy], sender) ? a : z)
        .forEach((item, i) => {
        if (mm.startsWith("r"))
            inv.getComponent("inventory").container.setItem(i >= (size - 9) ? i - (size - 9) : i + 9, item);
        else
            inv.getComponent("inventory").container.setItem(i, item);
        if (!item)
            diff++;
    });
};
const newSort = (x, y, sender) => {
    if (typeof x === typeof y && typeof x === "string" && x.length !== y.length) {
        let poi = 0;
        while (x[poi] == y[poi])
            poi++;
        y = y.slice(poi);
        x = x.slice(poi);
        while (x.length > y.length)
            y = " " + y;
        while (x.length < y.length)
            x = " " + x;
        while (x[x.length - 1] == y[y.length - 1]) {
            x = x.slice(0, x.length - 1);
            y = y.slice(0, y.length - 1);
        }
        if (!isNaN(Number(x)) && !isNaN(Number(y))) {
            x = Number(x);
            y = Number(y);
        }
        return x > y;
    }
    return x > y;
};
world
    .afterEvents
    .chatSend
    .subscribe(msg => {
    xInventoryTweaks(msg);
});
export {};
