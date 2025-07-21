import * as mc from "@minecraft/server";
import * as mcui from "@minecraft/server-ui";
import ScoreBase from "../../lib/xboyTools/scoreBase/rw";
import kyj from "../../lib/xboyTools/孔乙己/回字的左旋写法";
import xIsLand from "./xIsLand";
import { Permission } from "../DefendIsLand/main";
const GetIndex = () => ScoreBase.GetPoints("##xSkyConfigs##", "##xSkyLands##currentUID");
function showIslandMenu(player) {
    const mainMenu = new mcui.ActionFormData()
        .title("§l§9摆烂空岛")
        .body("§e欢迎来到摆烂空岛系统！\n请选择你要执行的操作：")
        .button("§a创建新岛屿", "textures/items/diamond")
        .button("§b传送到我的岛屿", "textures/items/ender_pearl")
        .button("§c重建我的岛屿", "textures/blocks/grass_side_carried")
        .button("§e岛屿信息", "textures/items/book_normal")
        .button("§6岛屿列表", "textures/items/map_empty");
    mainMenu.show(player).then(response => {
        if (response.canceled)
            return;
        switch (response.selection) {
            case 0:
                showCreateIslandForm(player);
                break;
            case 1:
                teleportToIsland(player);
                break;
            case 2:
                showRemakeConfirmation(player);
                break;
            case 3:
                showIslandInfo(player);
                break;
            case 4:
                player.sendMessage("§e[摆烂空岛] 岛屿列表功能开发中...");
                break;
        }
    });
}
function showCreateIslandForm(player) {
    if (xIsLand.GetIsPlayerScore(player.name) > 0) {
        player.sendMessage("§c[摆烂空岛] 你已经有自己的岛了");
        return;
    }
    const createForm = new mcui.ModalFormData()
        .title("§l§a创建新岛屿")
        .textField("§e请输入岛屿名称 §c(必填)", "例如：我的小岛");
    createForm.show(player).then(response => {
        if (response.canceled) {
            player.sendMessage("§c[摆烂空岛] 创建岛屿已取消");
            return;
        }
        if (!response.formValues || !response.formValues[0]) {
            player.sendMessage("§c[摆烂空岛] 岛屿名称不能为空，请重新尝试");
            mc.system.runTimeout(() => {
                showCreateIslandForm(player);
            }, 10);
            return;
        }
        const islandName = response.formValues[0].toString().trim();
        if (islandName === "") {
            player.sendMessage("§c[摆烂空岛] 岛屿名称不能为空白，请重新尝试");
            mc.system.runTimeout(() => {
                showCreateIslandForm(player);
            }, 10);
            return;
        }
        if (islandName.length < 2) {
            player.sendMessage("§c[摆烂空岛] 岛屿名称太短，至少需要2个字符");
            mc.system.runTimeout(() => {
                showCreateIslandForm(player);
            }, 10);
            return;
        }
        if (islandName.length > 16) {
            player.sendMessage("§c[摆烂空岛] 岛屿名称太长，最多16个字符");
            mc.system.runTimeout(() => {
                showCreateIslandForm(player);
            }, 10);
            return;
        }
        createIsland(player, islandName);
    });
}
function createIsland(player, name) {
    const index = GetIndex();
    const [x, z] = kyj.index2pos(index);
    if (!xIsLand.NewIsLand(String(name), player.name)) {
        player.sendMessage("§c[摆烂空岛] 此UID已经存在");
        return;
    }
    mc.system.run(() => {
        player.setSpawnPoint({
            x: x * 144 + 74,
            y: -490,
            z: z * 144 + 74,
            dimension: player.dimension
        });
        player.teleport({
            x: x * 144 + 74,
            y: -490,
            z: z * 144 + 74
        });
        mc.world.getDimension("overworld").runCommand(`structure load xsky_1 ${x * 144 + 72} -510 ${z * 144 + 72}`);
        mc.world.sendMessage(`§a[摆烂空岛] 第${index}号空岛-${name}-完成创建`);
    });
}
function teleportToIsland(player) {
    if (xIsLand.GetIsPlayerScore(player.name) <= 0) {
        player.sendMessage("§c[摆烂空岛] 你还没有自己的岛屿，请先创建一个岛屿");
        showCreateIslandForm(player);
        return;
    }
    const [playerX, playerZ] = kyj.index2pos(xIsLand.GetIsPlayerScore(player.name));
    mc.system.run(() => {
        player.teleport({
            x: playerX * 144 + 74,
            y: -490,
            z: playerZ * 144 + 74
        });
        player.sendMessage("§a[摆烂空岛] 已传送到你的岛屿");
    });
}
function showRemakeConfirmation(player) {
    if (xIsLand.GetIsPlayerScore(player.name) <= 0) {
        player.sendMessage("§c[摆烂空岛] 你还没有自己的岛屿，请先创建一个岛屿");
        showCreateIslandForm(player);
        return;
    }
    const confirmForm = new mcui.ActionFormData()
        .title("§l§c重建岛屿确认")
        .body("§4警告：重建岛屿将会清除岛屿上的所有方块和实体，并清空你的物品栏和末影箱。\n\n§e这个操作不可逆，确定要继续吗？")
        .button("§a确认重建", "textures/blocks/grass_side_carried")
        .button("§c取消", "textures/ui/cancel");
    confirmForm.show(player).then(response => {
        if (response.canceled || response.selection === 1) {
            player.sendMessage("§e[摆烂空岛] 已取消重建岛屿");
            return;
        }
        remakeIsland(player);
    });
}
function remakeIsland(player) {
    const [remakeX, remakeZ] = kyj.index2pos(xIsLand.GetIsPlayerScore(player.name));
    player.teleport({
        x: remakeX * 144 + 74,
        y: -490,
        z: remakeZ * 144 + 74
    });
    player.dimension.getEntities({
        excludeTypes: ["minecraft:player"],
        location: { x: remakeX * 144, y: -512, z: remakeZ * 144 },
        volume: { x: 144, y: 1024, z: 144 }
    }).forEach((entity) => {
        entity.remove();
    });
    player.getComponent("minecraft:inventory").container.clearAll();
    player.getComponent("minecraft:health").resetToMaxValue();
    for (let i = 0; i < 27; i++) {
        player.dimension.runCommand(`replaceitem entity "${player.name}" slot.enderchest ${i} air`);
    }
    mc.system.run(() => {
        mc.world.getDimension("overworld").runCommand(`structure load xsky_1 ${remakeX * 144 + 72} -510 ${remakeZ * 144 + 72}`);
        player.sendMessage("§a[摆烂空岛] 岛屿已重建成功");
    });
}
function showIslandInfo(player) {
    const playerScore = xIsLand.GetIsPlayerScore(player.name);
    if (playerScore <= 0) {
        player.sendMessage("§c[摆烂空岛] 你还没有自己的岛屿");
        return;
    }
    const [x, z] = kyj.index2pos(playerScore);
    const infoForm = new mcui.ActionFormData()
        .title("§l§e岛屿信息")
        .body(`§6岛屿ID: §f${playerScore}\n§6岛主: §f${player.name}\n§6坐标: §f${x * 144 + 74}, -490, ${z * 144 + 74}`)
        .button("§a传送到岛屿", "textures/items/ender_pearl")
        .button("§c关闭", "textures/ui/cancel");
    infoForm.show(player).then(response => {
        if (response.canceled || response.selection === 1)
            return;
        if (response.selection === 0) {
            teleportToIsland(player);
        }
    });
}
mc.system.beforeEvents.shutdown.subscribe((event) => {
    console.error("stop!!!!!!!!!!!!!!!!!!!!!11");
});
mc.system.beforeEvents.startup.subscribe((event) => {
    const commandRegistry = event.customCommandRegistry;
    commandRegistry.registerEnum("xisland:island_actions", ["create", "delete", "info", "list", "tp", "remake", "menu"]);
    const islandCommand = {
        name: "xisland:x",
        description: "岛屿管理命令",
        cheatsRequired: false,
        permissionLevel: mc.CommandPermissionLevel.Any,
        mandatoryParameters: [
            {
                name: "xisland:island_actions",
                type: mc.CustomCommandParamType.Enum
            }
        ],
        optionalParameters: [
            {
                name: "name",
                type: mc.CustomCommandParamType.String
            }
        ]
    };
    commandRegistry.registerCommand(islandCommand, (origin, action, name) => {
        const entity = origin.sourceEntity;
        if (!entity || !(entity instanceof mc.Player)) {
            return {
                status: 0,
                message: "此命令只能由玩家执行"
            };
        }
        const player = entity;
        mc.system.run(() => {
            switch (action) {
                case "menu":
                    showIslandMenu(player);
                    return {
                        status: 1,
                        message: ""
                    };
                case "create":
                    if (!name) {
                        showCreateIslandForm(player);
                        return {
                            status: 1,
                            message: ""
                        };
                    }
                    if (xIsLand.GetIsPlayerScore(player.name) > 0) {
                        player.sendMessage("§c[摆烂空岛] 你已经有自己的岛了");
                        return {
                            status: 0,
                            message: "§c[摆烂空岛] 你已经有自己的岛了"
                        };
                    }
                    if (name.trim().length < 2) {
                        player.sendMessage("§c[摆烂空岛] 岛屿名称太短，至少需要2个字符");
                        return {
                            status: 0,
                            message: "§c[摆烂空岛] 岛屿名称太短，至少需要2个字符"
                        };
                    }
                    if (name.length > 16) {
                        player.sendMessage("§c[摆烂空岛] 岛屿名称太长，最多16个字符");
                        return {
                            status: 0,
                            message: "§c[摆烂空岛] 岛屿名称太长，最多16个字符"
                        };
                    }
                    createIsland(player, name);
                    return {
                        status: 1,
                        message: ""
                    };
                case "delete":
                    const per = Permission(player.name, player.location);
                    if (!per.endsWith("1")) {
                        player.sendMessage("§c[摆烂空岛] 无法删除，因为不是岛主");
                        return {
                            status: 0,
                            message: "§c[摆烂空岛] 无法删除，因为不是岛主"
                        };
                    }
                    return {
                        status: 1,
                        message: "§c[摆烂空岛] 可以删除，因为是岛主（功能开发中）"
                    };
                case "tp":
                    teleportToIsland(player);
                    return {
                        status: 1,
                        message: ""
                    };
                case "remake":
                    if (!name || name.toLowerCase() !== "confirm") {
                        showRemakeConfirmation(player);
                        return {
                            status: 1,
                            message: ""
                        };
                    }
                    remakeIsland(player);
                    return {
                        status: 1,
                        message: ""
                    };
                case "info":
                    if (!name) {
                        showIslandInfo(player);
                        return {
                            status: 1,
                            message: ""
                        };
                    }
                    return {
                        status: 1,
                        message: `§e[摆烂空岛] 岛屿信息查询功能开发中...`
                    };
                case "list":
                    return {
                        status: 1,
                        message: "§e[摆烂空岛] 岛屿列表功能开发中..."
                    };
                default:
                    player.sendMessage("§c未知操作");
                    return {
                        status: 0,
                        message: "§c未知操作"
                    };
            }
        });
    });
});
mc.world.afterEvents.playerSpawn.subscribe((event) => {
    const player = event.player;
    mc.system.runTimeout(() => {
        if (xIsLand.GetIsPlayerScore(player.name) <= 0) {
            player.sendMessage("§e[摆烂空岛] 欢迎来到摆烂空岛！");
            player.sendMessage("§e[摆烂空岛] 输入 §b/xisland:x menu §e打开岛屿菜单");
            mc.system.runTimeout(() => {
                showIslandMenu(player);
            }, 40);
        }
    }, 20);
});
mc.system.runInterval(() => {
    const overworld = mc.world.getDimension("overworld");
    const nether = mc.world.getDimension("nether");
    const the_end = mc.world.getDimension("the_end");
    overworld.getPlayers().forEach((player) => {
        if (player.location.y < -528) {
            const xz = kyj.index2pos(xIsLand.GetIsPlayerScore(player.name));
            if (xIsLand.GetIsPlayerScore(player.name) <= 0) {
                player.sendMessage('[摆烂空岛] 还没有自己的岛');
                player.sendMessage('§e输入 §b/xisland:x menu §e打开岛屿菜单');
                mc.system.runTimeout(() => {
                    showIslandMenu(player);
                }, 20);
            }
            else {
                player.teleport({
                    x: xz[0] * 144 + 74,
                    y: 40,
                    z: xz[1] * 144 + 74
                }, { dimension: nether });
                mc.system.runTimeout(() => player.runCommand(`setblock ${xz[0] * 144 + 74} 38 ${xz[1] * 144 + 74} minecraft:netherrack`), 8);
            }
        }
        if (player.location.y > 513) {
            const xz = kyj.index2pos(xIsLand.GetIsPlayerScore(player.name));
            if (xIsLand.GetIsPlayerScore(player.name) <= 0) {
                player.sendMessage('[摆烂空岛] 还没有自己的岛');
                player.sendMessage('§e输入 §b/xisland:x menu §e打开岛屿菜单');
                mc.system.runTimeout(() => {
                    showIslandMenu(player);
                }, 20);
            }
            else {
                player.teleport({
                    x: xz[0] * 144 + 74,
                    y: 40,
                    z: xz[1] * 144 + 74
                }, { dimension: the_end });
                mc.system.runTimeout(() => player.runCommand(`setblock ${xz[0] * 144 + 74} 38 ${xz[1] * 144 + 74} minecraft:end_stone`), 8);
            }
        }
    });
}, 10);
