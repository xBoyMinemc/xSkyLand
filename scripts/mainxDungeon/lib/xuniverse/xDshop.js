// import { world } from "@minecraft/server";
import { orxyz, where }                  from '../xuniverse/xconfig.js';                    //配置变量
import ScoreBase from "../xboyTools/scoreBase/rw.js";
//############################################################################
//who
// const overworld = world.getDimension("overworld");
const nether = world.getDimension("nether");
const the_end = world.getDimension("the end");
// const getScorePlayerStr = function (playerName,obj){return overworld.runCommandAsync(`scoreboard players test "${playerName}" ${obj} * *`).statusMessage.split("在")[0].replaceAll("分数","").replaceAll(" ","");};
// const setScorePlayerStr = function (name,obj,num){overworld.runCommandAsync(`scoreboard players set "${name}" ${obj} ${num}`)};
// const addScorePlayerStr = function (name,obj,num){overworld.runCommandAsync(`scoreboard players add "${name}" ${obj} ${num}`)};//仨旧时代的产物

const FIX = Math.random() + 0.2
const goodsListObject = {
    "木材" : {
         "橡木" : {
        itemName    : "minecraft:log",
        itemData    : 0,
        itemCount   : 64,
        price       : (48*FIX*2.3).toFixed(0)
        },
        "云杉木" : {
        itemName    : "minecraft:log",
        itemData    : 1,
        itemCount   : 64,
        price       : (48*FIX*2.3).toFixed(0)
        },
        "白桦木" : {
        itemName    : "minecraft:log",
        itemData    : 2,
        itemCount   : 64,
        price       : (48*FIX*2.3).toFixed(0)
        },
        "从林木" : {
        itemName    : "minecraft:log",
        itemData    : 3,
        itemCount   : 64,
        price       : (48*FIX*2.3).toFixed(0)
        },
        "金合欢木" : {
        itemName    : "minecraft:log2",
        itemData    : 0,
        itemCount   : 64,
        price       : (48*FIX*2.3).toFixed(0)
        },
        "深色橡木" : {
        itemName    : "minecraft:log2",
        itemData    : 1,
        itemCount   : 64,
        price       : (48*FIX*2.3).toFixed(0)
        }
    },
    "石材" : {
        "圆石" : {
            itemName    : "minecraft:cobblestone",
            itemData    : 0,
            itemCount   : 64,
            price       : (64*(FIX)).toFixed(0)
            },
        "石砖" : {
            itemName    : "minecraft:stonebrick",
            itemData    : 0,
            itemCount   : 64,
            price       : (96*(FIX)).toFixed(0)
            }
    },
    "食材" : {
        "小面包" : {
            itemName    : "minecraft:bread",
            itemData    : 0,
            itemCount   : 16,
            price       : (16*(FIX+4.5)).toFixed(0)
            }
    },
    "建材": {
        "荧石": {
            itemName: "minecraft:glowstone",
            itemData: 0,
            itemCount: 4,
            price: (8 * (FIX)).toFixed(0)
        },
        "末地猪": {
            itemName: "minecraft:end_rod",
            itemData: 0,
            itemCount: 4,
            price: (6 * (FIX)).toFixed(0)
        },
        "海晶灯": {
            itemName: "minecraft:sea_lantern",
            itemData: 0,
            itemCount: 4,
            price: (3 * (FIX)).toFixed(0)
        },
        "白色混凝土": {
            itemName: "minecraft:concrete",
            itemData: 0,
            itemCount: 32,
            price: (48 * (FIX)).toFixed(0)
        },
        "橙色混凝土": {
            itemName: "minecraft:concrete",
            itemData: 1,
            itemCount: 32,
            price: (48 * (FIX)).toFixed(0)
        },
        "品红混凝土": {
            itemName: "minecraft:concrete",
            itemData: 2,
            itemCount: 32,
            price: (48 * (FIX)).toFixed(0)
        },
        "淡蓝混凝土": {
            itemName: "minecraft:concrete",
            itemData: 3,
            itemCount: 32,
            price: (48 * (FIX)).toFixed(0)
        },
        "黄色混凝土": {
            itemName: "minecraft:concrete",
            itemData: 4,
            itemCount: 32,
            price: (48 * (FIX)).toFixed(0)
        },
        "黄绿混凝土": {
            itemName: "minecraft:concrete",
            itemData: 5,
            itemCount: 32,
            price: (48 * (FIX)).toFixed(0)
        },
        "粉色混凝土": {
            itemName: "minecraft:concrete",
            itemData: 6,
            itemCount: 32,
            price: (48 * (FIX)).toFixed(0)
        },
        "灰色混凝土": {
            itemName: "minecraft:concrete",
            itemData: 7,
            itemCount: 32,
            price: (48 * (FIX)).toFixed(0)
        },
        "淡灰混凝土": {
            itemName: "minecraft:concrete",
            itemData: 8,
            itemCount: 32,
            price: (48 * (FIX)).toFixed(0)
        },
        "青色混凝土": {
            itemName: "minecraft:concrete",
            itemData: 9,
            itemCount: 32,
            price: (48 * (FIX)).toFixed(0)
        },
        "紫色混凝土": {
            itemName: "minecraft:concrete",
            itemData: 10,
            itemCount: 32,
            price: (48 * (FIX)).toFixed(0)
        },
        "蓝色混凝土": {
            itemName: "minecraft:concrete",
            itemData: 11,
            itemCount: 32,
            price: (48 * (FIX)).toFixed(0)
        },
        "棕色混凝土": {
            itemName: "minecraft:concrete",
            itemData: 12,
            itemCount: 32,
            price: (48 * (FIX)).toFixed(0)
        },
        "绿色混凝土": {
            itemName: "minecraft:concrete",
            itemData: 13,
            itemCount: 32,
            price: (48 * (FIX)).toFixed(0)
        },
        "红色混凝土": {
            itemName: "minecraft:concrete",
            itemData: 14,
            itemCount: 32,
            price: (48 * (FIX)).toFixed(0)
        },

    },
    "耗材" : {
        "烟花": {
            itemName: "minecraft:firework_rocket",
            itemData: 0,
            itemCount: 8,
            price: (20 * (FIX)).toFixed(0)
        },        
        "空气": {
            itemName: "minecraft:air",
            itemData: 0,
            itemCount: 8,
            price: (20 * (FIX)).toFixed(0)
        },    
        "蜂蜜块": {
            itemName: "minecraft:honey_block",
            itemData: 0,
            itemCount: 1,
            price: (48 * (FIX)).toFixed(0)
        },        
        "黏液块": {
            itemName: "minecraft:slime",
            itemData: 0,
            itemCount: 1,
            price: (32 * (FIX)).toFixed(0)
        },        
        "教训": {
            itemName: "minecraft:air",
            itemData: 0,
            itemCount: 64,
            price: (64 * (FIX)).toFixed(0)
        }        
    }    // "" : [],
    // "" : [],
    // "" : [],
    // "" : [],
    // "" : [],
    // "" : [],
    // "" : [],
    // "" : [],
    // "" : [],
    // "" : [],
    // "" : []
}

const shop = function(){

}

world.events.chat.subscribe(msg => {

   const {message} = msg;
    if(message=="地牢商店菜单" || message=="地牢商店列表" || message=="地牢商店" ){
        msg.cancel = true
        Object.keys(goodsListObject).forEach((key)=>{
            let color = Math.floor(Math.random() * 9)+1;
            msg.sender.sendMessage(`§r§l§${color}#商品分类：${key}`)
            Object.keys(goodsListObject[key]).forEach((keyb)=>{
            msg.sender.sendMessage(`|_____§r§l§${color}#商品名称：${keyb} # 价格：${goodsListObject[key][keyb].itemCount}个/${goodsListObject[key][keyb].price}地牢积分 `)
            })
        })
    }
    //地牢购买 木材 原木 1
    if(message.startsWith("地牢购买 ")){
        msg.cancel = true
        let color = Math.floor(Math.random() * 10);
        let Arr = message.replace("地牢购买 ","").split(" ")
        if(Arr.length == 3){
            if(goodsListObject[Arr[0]]){if(goodsListObject[Arr[0]][Arr[1]]){
                let goods = goodsListObject[Arr[0]][Arr[1]]
                let price = goods.price
                if(+ScoreBase.GetPoints("xdungon_dis",msg.sender.nameTag)>=price*(+Arr[2])){
                    ScoreBase.AddPoints(msg.sender.nameTag,"xdungon_dis",-1*price*(+Arr[2]))
                   msg.sender.runCommandAsync(`give @s ${goods.itemName} ${+Arr[2]*goods.itemCount} ${goods.itemData}`)
                 }else{
                     msg.sender.sendMessage(`§r§l§${color}#穷鬼爬，无功无禄`)
                }
            }else{
                msg.sender.sendMessage(`§r§l§${color}#无此商品，输入地牢商店菜单`)}
            }else{
                msg.sender.sendMessage(`§r§l§${color}#无此商品，输入地牢商店菜单`)}
        }else{
            msg.sender.sendMessage(`§r§l§${color}#格式错误，示例：§r§l地牢购买 木材 原木 1              格式： 地牢购买 分类 物品名 份数`)
        }
    }
})

