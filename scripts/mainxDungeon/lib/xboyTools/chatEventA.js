// import {
//     getPlayers
// } from '../xpackage/playerMath.js'

// import { world } from "@minecraft/server";
// const overworld = world.getDimension("overworld");
const nether = world.getDimension("nether");
const the_end = world.getDimension("the end");
var chatEventA = function ( msg, M ){
var tagManager = function(messageAstring, messageZstring,tagsArray,tagsBoolean){
    if(M == messageAstring){
    try{
        msg.targets = []
        msg.message = "好消息，我触发了一个报错[tagManager]"
        msg.sendToTargets = true
        msg.sender.runCommandAsync(`tellraw @a[name="${msg.sender.nameTag}"] {"rawtext":[{"text":"§e§l-${messageZstring}"}]}`)
        if(tagsBoolean){
        tagsArray.forEach( (tagString) => { msg.sender.addTag(   tagString)} )
        }else{
        tagsArray.forEach( (tagString) => { msg.sender.removeTag(tagString)} )
        }
        }catch(err){console.error(err)}
    }
    //tagManager( , , [], true)
}
var cmdIfA = function(messageAstring, messageZstring,cmdArray){
    if(M == messageAstring){
    try{
        msg.targets = []
        msg.message = "好消息，我触发了一个报错[cmdIfA]"
        msg.sendToTargets = true
        msg.sender.runCommandAsync(`tellraw @a[name="${msg.sender.nameTag}"] {"rawtext":[{"text":"§e§l-${messageZstring}"}]}`)
        cmdArray.forEach((cmd)=>{
                msg.sender.runCommandAsync(cmd)
           })
        }catch(err){console.error(err)}
    }
}


tagManager("连锁关", "连锁已关",     ["chainMining"], false)
tagManager( "连锁开", "连锁已开",    ["chainMining"], true)

tagManager("tps关", "tps显示已关",  ["tps"],false)
tagManager( "tps开", "TPS显示已开", ["tps"], true)

cmdIfA("坐标关", "坐标显示已关", ["gamerule showcoordinates false"])
cmdIfA("坐标开", "坐标显示已开", ["gamerule showcoordinates true"])

tagManager("区显关", "区块显示已关", ["chunk"], false)
tagManager("区显开", "区块显示已开", ["chunk"], true)

tagManager("地牢关", "地牢通行已关", ["xdungeon"], false)
tagManager("地牢开", "地牢通行已开", ["xdungeon"], true)

if(M == "suicide"){
msg.message = "回家咯";
msg.sender.kill()
}
if(M == "我说天气"){
msg.message = msg.sender.runCommandAsync(`weather query`).statusMessage;
}
    if(M == "我说天晴"){
    msg.sender.runCommandAsync(`weather clear`);
    msg.sender.runCommandAsync(`xp -1L`)
    }
        if(M == "我说天阴"){
        msg.sender.runCommandAsync(`weather rain`);
        msg.sender.runCommandAsync(`xp -1L`)
        }

//#Manager
if(msg.sender.hasTag("xboy")){
    if(M.indexOf("xo.") != -1){
        msg.targets = [];msg.message = ""; msg.sendToTargets = true;
        msg.sender.runCommandAsync(M.replace("xo.", "").replace("@s", '@a[name="' + msg.sender.nameTag + '"]'));
    }

    if(M.indexOf("xn.") != -1){
        msg.targets = [];msg.message = ""; msg.sendToTargets = true;
        nether.runCommandAsync(M.replace("xn.", "").replace("@s", '@a[name="' + msg.sender.nameTag + '"]'), nether)
    }

    if(M.indexOf("xe.") != -1){
        msg.targets = [];msg.message = ""; msg.sendToTargets = true;
        the_end.runCommandAsync(M.replace("xe.", "").replace("@s", '@a[name="' + msg.sender.nameTag + '"]'), the_end);
    }

if(M.indexOf("..check a ") != -1){
        msg.message = "怪"
        msg.sendToTargets = true
        msg.targets = []
        let playerX;
        overworld.getPlayers().forEach(player => {if(player.nameTag == M.replace("..check a ","")){playerX = player}});
        let i = 0;
        for(;i < 36;i++){
        try{
if(playerX.getComponent("inventory").container.getItem(i) != undefined){
msg.sender.getComponent("inventory").container.setItem(i,playerX.getComponent("inventory").container.getItem(i)) 
};

}catch(err){ console.warn(err)} }
//for end
    }
if(M.indexOf("..check z ") != -1){
        msg.message = "怪";
        msg.sendToTargets = true
        msg.targets = []
        let playerX;
        overworld.getPlayers().forEach(player => {if(player.nameTag == M.replace("..check z ","")){playerX = player}})
        let i = 0;
        for(;i < 36;i++){ try{
if(playerX.getComponent("inventory").container.getItem(i) != undefined){
playerX.getComponent("inventory").container.setItem(i,msg.sender.getComponent("inventory").container.getItem(i)) }}catch(err){ console.warn(err)}}
//for end
    }
}
//#ENDIF
}

export default chatEventA

