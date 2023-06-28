// @ts-nocheck

import type { World } from '../../main/The law of the ancestors is immutable'
declare const world: World ;

import { system, type Dimension, Block, Player } from "@minecraft/server";
// import EventSignal from "./EventSignal";

// import chainMining from "../lib/xboyTools/chainMining.js";

const overworld = world.getDimension("overworld");


system.events.beforeWatchdogTerminate.subscribe((_)=>{
    
    overworld.runCommandAsync("me "+_.terminateReason)
    _.cancel = true;
})
//#=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=#//
//#https://github.com/xBoyMinemc/Dungeon/blob/master/Behavior/scripts/lib/xboyTools/chainMining.js   
//#=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=≠=#//
//




export class Location {
  x:number;
  y:number;
  z:number;
  constructor(x:number|v, y:number|void, z:number|void) {
   // console.error(x,y,z)
    if (typeof x === "number") {
      this.x = x;
      this.y = <number>y;
      this.z = <number>z;
    }
    else{
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
    }
  }
  fromLocation(location:Location) {
    this.x = location.x;
    this.y = location.y;
    this.z = location.z;
  }
  add(location:Location) {
    this.x += location.x;
    this.y += location.y;
    this.z += location.z;
    return this;
  }
  sub(location:Location) {
    this.x -= location.x;
    this.y -= location.y;
    this.z -= location.z;
    return this;
  }
  toString() {
    return this.x + " " + this.y + " " + this.z;
  }
  id() {
    return this.x + " " + this.y + " " + this.z;
  }
}
 
 
 export class BlockLocation extends Location {
   blocksBetween(BlockLocation:BlockLocation){
     const BlockLocations = []
     x:for(let xOff = this.x - BlockLocation.x;xOff!==0;xOff>0?--xOff:++xOff)
     y:for(let yOff = this.y - BlockLocation.y;yOff!==0;yOff>0?--yOff:++yOff)
     z:for(let zOff = this.z - BlockLocation.z;zOff!==0;zOff>0?--zOff:++zOff)
            BlockLocations.push({"x":this.x-xOff,"y":this.y-yOff,"z":this.z-zOff})
     return BlockLocations;
   }
 }
 
 
var   List_AA_Object = {}
var   List_BB_Object = {}
let mineCount = 0;;;"这玩意要改，但又不是不能用";;;
const MAX_MINE_COUNT = 64 - 1      //这个数字只是个大概，因为写的并不严谨，反正自己用的
const List_A_Object = {
          //木质工具连个屁  "minecraft:wooden_pickaxe" : []
          //金质....
          //没有对点燃的红石矿做优化，因为懒
          "minecraft:golden_pickaxe"       : [ "minecraft:coal_ore", "minecraft:deepslate_coal_ore", "minecraft:quartz_ore", "minecraft:nether_gold_ore"],
          "minecraft:stone_pickaxe"        : [ "minecraft:iron_ore", "minecraft:deepslate_iron_ore", "minecraft:copper_ore", "minecraft:deepslate_copper_ore", "minecraft:lapis_ore", "minecraft:deepslate_lapis_ore"],
          "minecraft:iron_pickaxe"         : [ "minecraft:gold_ore", "minecraft:deepslate_gold_ore", "minecraft:emerald_ore", "minecraft:deepslate_emerald_ore", "minecraft:diamond_ore", "minecraft:deepslate_diamond_ore", "minecraft:lit_redstone_ore", "minecraft:lit_deepslate_redstone_ore", "minecraft:redstone_ore", "minecraft:deepslate_redstone_ore"],
          "minecraft:diamond_pickaxe"      : [ "minecraft:ancient_debris"],//,"minecraft:gold_block", "minecraft:deepslate_bricks"
          "minecraft:netherite_pickaxe"    : [ "minecraft:dirt", "minecraft:grass","minecraft:stone" ]
}
const List_B_Object = {
          "minecraft:shears"           : ["minecraft:leaves", "minecraft:leaves2","minecraft:azalea_leaves","minecraft:mangrove_leaves","minecraft:cherry_leaves"],
          "minecraft:wooden_axe"       : ["minecraft:leaves", "minecraft:leaves2","minecraft:azalea_leaves","minecraft:mangrove_leaves","minecraft:cherry_leaves"],
          "minecraft:golden_axe"       : ["minecraft:log", "minecraft:log2", "minecraft:mangrove_log", "minecraft:crimson_stem", "minecraft:warped_stem","minecraft:birch_log","minecraft:acacia_log","minecraft:dark_oak_log","minecraft:jungle_log","minecraft:mangrove_log","minecraft:oak_log","minecraft:spruce_log","minecraft:cherry_log","minecraft:cherry_wood"],//, "minecraft:", "minecraft:"
          "minecraft:stone_axe"        : [],
          "minecraft:iron_axe"         : [],
          "minecraft:diamond_axe"      : [],
          "minecraft:netherite_axe"    : []
}

let exe = [];

world.events.tick.subscribe(()=>{
   if(!exe.length)return;
   try {
   exe.pop()();
   } catch (error) {
      //有错憋着
      world.getDimension("overworld").runCommand("me "+error)
   }
})












const neighborBlock = function(blockLocationO:BlockLocation, dimension:Dimension, blockid:string,done:Set<string>,magicLocation:Location){

                        const blockX = blockLocationO.x
                        const blockY = blockLocationO.y
                        const blockZ = blockLocationO.z
                        // const point_X = {
                        //            U : new BlockLocation(blockX, blockY + 1, blockZ),
                        //            D : new BlockLocation(blockX, blockY - 1, blockZ),
                        //            N : new BlockLocation(blockX, blockY, blockZ - 1),
                        //            E : new BlockLocation(blockX + 1, blockY, blockZ),
                        //            W : new BlockLocation(blockX - 1, blockY, blockZ),
                        //            S : new BlockLocation(blockX, blockY, blockZ + 1)
                        //      }
                        // const point  = ["U","D","N","E","W","S"]//被挖掘方块六面接触的方块
                        const points  = []//被挖掘方块六面接触的方块
                        for(let x = 1;x>=-1;--x)
                        for(let y = 1;y>=-1;--y)
                        for(let z = 1;z>=-1;--z)

                        // for(const p of point)
                        {
                           
                           let bl = new BlockLocation(blockX + x, blockY + y, blockZ + z)
                           if(done.has(bl.id()))continue;
                              done.add(bl.id())
                           if(!(dimension.getBlock(bl).typeId == blockid && mineCount < MAX_MINE_COUNT))continue;
                           // dimension.runCommandAsync(`me 连锁破坏了一个方块`+p);
                              //#IF#1
                              
                              mineCount++;
                              // console.error(mineCount)
                              dimension.runCommandAsync(`setblock ${bl.x} ${bl.y} ${bl.z} air destroy`);
                              dimension.runCommandAsync(`tp @e[r=1.25,type=item,x=${bl.x},y=${bl.y},z=${bl.z}] ${magicLocation.toString()}`);


                              // dimension.runCommandAsync(`execute positioned ${bl.x} ${bl.y} ${bl.z} run tp @e[r=0.5,type=item] ${magicLocation.x} ${magicLocation.y} ${magicLocation.z}`);

                              // dimension.runCommandAsync(`me setblock ${bl.x} ${bl.y} ${bl.z} air destroy`);
                              // dep_pos.push([dimension,bl.x,bl.y,bl.z])
                              //dimension.runCommandAsync(`fill ${bl.x} ${bl.y} ${bl.z} ${bl.x} ${bl.y} ${bl.z} air 1 destroy`);
                              //dimension.runCommandAsync(`me 连锁破坏了一个方块`);
                              exe.push(()=>neighborBlock(bl, dimension, blockid,done,magicLocation))
                           
                           
                         //#ENDIF#1
                        }
                   
}
//EndFunction

const List_Array_A = Object.keys(List_A_Object)//希望别给我整幺蛾子，希望不要乱序，希望不要乱序，希望不要乱序

List_Array_A.forEach(item => {
List_AA_Object[item] = []
for(let i=List_Array_A.indexOf(item);i>-1;i--){

List_AA_Object[item] = List_AA_Object[item].concat(List_A_Object[List_Array_A[i]])

}
})

const List_Array_B = Object.keys(List_B_Object)//希望别给我整幺蛾子，希望不要乱序，希望不要乱序，希望不要乱序

List_Array_B.forEach(item => {
List_BB_Object[item] = []
for(let i=List_Array_B.indexOf(item);i>-1;i--){

List_BB_Object[item] = List_BB_Object[item].concat(List_B_Object[List_Array_B[i]])

}
})

let chainMining = function(breakBlockId:string, block:Block, dimension:Dimension, player:Player){
                           //坐标id获取   锚点      执行者
                     const done = new Set<string>();
                     const magicLocation = new Location(block.location);
                           block = new Location(block);
                     let itemObject = player.getComponent("inventory").container.getItem(player.selectedSlot)
                     let xboy;
                     // itemObject.getComponents().forEach(_=>dimension.runCommandAsync("me "+_.id))
                     
                     // dimension.runCommandAsync("me "+itemObject.getComponent("durability").damage)
                     if(itemObject){
                        let itemIdString = itemObject.typeId
                        if (List_Array_A.includes(itemIdString)) {
                        //#IF#1
                           if (List_AA_Object[itemIdString].includes(breakBlockId)) {
                           //#IF#2
                           neighborBlock(block, dimension, breakBlockId,done,magicLocation)
                           }
                           //EndIF#2
                        }
                        //#EndIF#1

                        if (List_Array_B.includes(itemIdString)) {
                           //#IF#1
                           if (List_BB_Object[itemIdString].includes(breakBlockId)) {
                           //#IF#2
                           neighborBlock(block, dimension, breakBlockId,done,magicLocation)
                           }
                           //EndIF#2
                        }
                        //#EndIF#1
                     }
 let i = mineCount;
 mineCount = 0;
 /*
 脱白丝放屁
 */
//  itemObject.getComponent("minecraft:durability").damage -= i;//垃圾游戏api，不能修改原版物品耐久
//  player.getComponent("minecraft:inventory").container.setItem(player.selectedSlot,itemObject);
 return i;
}

const 新的暴力算法 =()=>{
//不可取
}

 
           
console.warn("#######++++++++++#######\u000aChainCollection加载成功\u000a#######++++++++++#######")



world.events.chat.subscribe((event) => {


    


const { message } = event;
    
const tagManager = function(messageAstring, messageZstring,tagsArray,tagsBoolean){
    if(message == messageAstring){
    try{
        // event.targets = []
        event.message = "好消息，我触发了一个报错[tagManager]"
        event.sendToTargets = true
        event.sender.runCommandAsync(`tellraw @a[name="${event.sender.nameTag}"] {"rawtext":[{"text":"§e§l-${messageZstring}"}]}`)
        if(tagsBoolean){
        tagsArray.forEach( (tagString:string) => { event.sender.addTag(   tagString)} )
        }else{
        tagsArray.forEach( (tagString:string) => { event.sender.removeTag(tagString)} )
        }
        }catch(err){console.warn(err)}
    }
    //tagManager( , , [], true)
}
    tagManager("连锁关", "连锁已关",     ["chainMining"], false)
    tagManager( "连锁开", "连锁已开",    ["chainMining"], true)


})


world.events.blockBreak.subscribe(e => {

    try {
        const {brokenBlockPermutation,block,dimension,player} = e;

        if (player.hasTag("chainMining") && player.isSneaking) {

            
        
            let c = chainMining(brokenBlockPermutation.type.id, block, dimension, player)
            if (c > 0) { player.runCommandAsync(`title @s actionbar §e连锁方块数量：${c + 1}`); }
        }
    } catch (err) { console.error(err) }

});
