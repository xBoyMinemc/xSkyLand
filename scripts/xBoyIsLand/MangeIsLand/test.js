import ScoreBase from "../../lib/xboyTools/scoreBase/rw";
import kyj from "../../lib/xboyTools/孔乙己/回字的左旋写法";
import xIsLand from "./xIsLand";
import { Permission } from "../DefendIsLand/main";
const overworld = world.getDimension("overworld");
let GetIndex = () => ScoreBase.GetPoints("##xSkyConfigs##", "##xSkyLands##currentUID");
world.events.chat.subscribe(_ => {
    if (_.message === "重开" && 0) {
        const [x, z] = kyj.index2pos(xIsLand.GetIsPlayerScore(_.sender.name));
        _.sender.teleport({ x: x * 144 + 74, y: -490, z: z * 144 + 74 });
        overworld.runCommandAsync(`structure load xsky_1 ${x * 144 + 72} -510 ${z * 144 + 72}`);
        return;
    }
    if (!_.message.startsWith("~island"))
        return;
    if (_.message === "~island") {
        if (xIsLand.GetIsPlayerScore(_.sender.name) <= 0) {
            _.sender.sendMessage('[摆烂空岛] 还没有自己的岛\u000a输入 ~island空格+岛屿名\u000a以便于创建自己的岛屿');
            return;
        }
        const [x, z] = kyj.index2pos(xIsLand.GetIsPlayerScore(_.sender.name));
        _.sender.teleport({ x: x * 144 + 74, y: -490, z: z * 144 + 74 });
        return;
    }
    const 新建岛屿 = (ower, name) => {
        if (xIsLand.GetIsPlayerScore(ower.name) > 0) {
            ower.sendMessage('[摆烂空岛] 已经有自己的岛了');
            return;
        }
        const index = GetIndex();
        const [x, z] = kyj.index2pos(index);
        if (!xIsLand.NewIsLand(String(name), ower.name)) {
            ower.sendMessage('[摆烂空岛] 此UID=> 已经存在');
            return 0;
        }
        ower.setSpawn({ x: x * 144 + 74, y: -490, z: z * 144 + 74 }, ower.dimension);
        ower.teleport({ x: x * 144 + 74, y: -490, z: z * 144 + 74 });
        world.getPlayers().forEach(player => player.sendMessage(`[摆烂空岛] 第${index}号空岛开始创建`));
        overworld.runCommandAsync(`structure load xsky_1 ${x * 144 + 72} -510 ${z * 144 + 72}`);
        world.getPlayers().forEach(player => player.sendMessage(`[摆烂空岛] 第${index}号空岛完成创建`));
    };
    if (_.message.startsWith("~island ") && _.message !== "~island ")
        新建岛屿(_.sender, _.message.replace("~island ", ""));
    const 删除所在岛屿 = (player) => {
        const per = Permission(player.name, player.location);
        if (!per.endsWith("1")) {
            player.sendMessage('[摆烂空岛] 无法删除，因为不是岛主');
            return;
        }
        else {
            player.sendMessage('[摆烂空岛] 可以删除，因为是岛主');
            return;
        }
    };
    if (_.message.startsWith("~island del"))
        删除所在岛屿(_.sender);
});
