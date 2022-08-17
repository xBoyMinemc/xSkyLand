import { world } from "mojang-minecraft";
import "../xBoyIsLand/MangeIsLand/main.js";
import "../xBoyIsLand/DefendIsLand/main";
const overworld = world.getDimension("overworld");
world.events.beforeChat.subscribe((event) => {
    const { message } = event;
    const tagManager = function (messageAstring, messageZstring, tagsArray, tagsBoolean) {
        if (message == messageAstring) {
            try {
                event.targets = [];
                event.message = "好消息，我触发了一个报错[tagManager]";
                event.sendToTargets = true;
                event.sender.runCommand(`tellraw @a[name="${event.sender.nameTag}"] {"rawtext":[{"text":"§e§l--${messageZstring}"}]}`);
                if (tagsBoolean) {
                    tagsArray.forEach((tagString) => { event.sender.addTag(tagString); });
                }
                else {
                    tagsArray.forEach((tagString) => { event.sender.removeTag(tagString); });
                }
            }
            catch (err) {
                console.warn(err);
            }
        }
    };
    tagManager("连锁关", "连锁已关", ["chainMining"], false);
    tagManager("连锁开", "连锁已开", ["chainMining"], true);
});
world.events.blockBreak.subscribe(e => {
    try {
    }
    catch (err) {
        console.error(err);
    }
});
