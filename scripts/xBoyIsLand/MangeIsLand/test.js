import { world } from "@minecraft/server";
import ScoreBase from "../../lib/xboyTools/scoreBase/rw";
import kyj from "../../lib/xboyTools/孔乙己/回字的左旋写法";
import xIsLand from "./xIsLand";
import { Permission } from "../DefendIsLand/main";
const overworld = world.getDimension("overworld");
let GetIndex = () => ScoreBase.GetPoints("##xSkyConfigs##", "##xSkyLands##currentUID");
world.events.chat.subscribe(_ => {
    if (!_.message.startsWith("~island"))
        return;
    if (_.message == "~island") {
        if (xIsLand.GetIsPlayerScore(_.sender.name) <= 0) {
            overworld.runCommandAsync(`me 还没有自己的岛\u000a输入 ~island空格+岛屿名\u000a以便于创建自己的岛屿"`);
            return;
        }
        const [x, z] = kyj.index2pos(xIsLand.GetIsPlayerScore(_.sender.name));
        overworld.runCommandAsync(`tp @a ${x * 144 + 74} -490 ${z * 144 + 74}`);
        return;
    }
    const 新建岛屿 = (ower, name) => {
        if (xIsLand.GetIsPlayerScore(ower.name) > 0) {
            overworld.runCommandAsync(`me 已经有自己的岛了`);
            return;
        }
        const index = GetIndex();
        const [x, z] = kyj.index2pos(index);
        if (!xIsLand.NewIsLand(String(name), ower.name)) {
            overworld.runCommandAsync(`此UID=> 已经存在`);
            return 0;
        }
        ower.runCommandAsync(`spawnpoint @s ${x * 144 + 74} -490 ${z * 144 + 74}`);
        ower.runCommandAsync(`tp @s ${x * 144 + 74} -490 ${z * 144 + 74}`);
        overworld.runCommandAsync(`me 第${index}号空岛新建成功`);
        overworld.runCommandAsync(`structure load xsky_1 ${x * 144 + 72} -510 ${z * 144 + 72}`);
    };
    if (_.message.startsWith("~island ") && _.message !== "~island ")
        新建岛屿(_.sender, _.message.replace("~island ", ""));
    const 删除所在岛屿 = (player) => {
        const per = Permission(player.name, player.location);
        if (!per.endsWith("1")) {
            player.runCommandAsync('tellraw @s {"rawtext": [{"text": "无法删除，因为不是岛主"}]}');
            return;
        }
        else {
            player.runCommandAsync('tellraw @s {"rawtext": [{"text": "可以删除，因为是岛主"}]}');
            return;
        }
    };
    if (_.message.startsWith("~island del"))
        删除所在岛屿(_.sender);
});
