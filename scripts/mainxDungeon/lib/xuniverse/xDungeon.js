import { 
	// world,
	// EntityQueryOptions,
	// BlockLocation,
	// Location,
	MolangVariableMap
	// GameMode
  } from "@minecraft/server";
import {
	tickLineCLEAR,
	chunk_fill_tool_xYzIDw,
	aisle_fill_tool_xyzIDwm,
	wall_fill_tool_xyzIDw,
	gate_fill_tool_xyzIDIDw,
	xboy_fill_tool_xyzIDw,
	setCountRest
  } from './xLand.js';
import {
	testDead,
	// getPlayers
  } from '../xpackage/playerMath.js'                            //无情的fill机器-cmd&tick实现
// import { initConsole }       from '../RGB39/tellraw-console.js';//RGB牌控制台输出-Powered by RGB39
import { orxyz, where }      from '../xuniverse/xconfig.js';    //配置变量
import Chunk_Boundary_Point  from '../xpackage/chunkMath.js';   //计算并返回区块边界点#1
import xboy                  from '../xuniverse/xx.js';         //生成房间位置
import '../xuniverse/xDshop.js';                                //sd
import ScoreBase from "../xboyTools/scoreBase/rw.js"
	

const overworld = world.getDimension("overworld");
const nether = world.getDimension("nether");
const the_end = world.getDimension("the end");

const wholeWorld = ["overworld", "nether", "the end"];// zawaluduo
const backTag    = "###xback###";
const xz2_17_5 = Chunk_Boundary_Point.x2D([2**17.5,2**17.5])[0] +300                    //忘记干嘛的了
// const getScorePlayerStr = function (playerName,obj){return overworld.runCommandAsync(`scoreboard players test "${playerName}" ${obj} * *`).statusMessage.split("在")[0].replaceAll("分数","").replaceAll(" ","");};
// const setScorePlayerStr = function (name,obj,num){overworld.runCommandAsync(`scoreboard players set ${name} ${obj} ${num}`)};
// const addScorePlayerStr = function (name,obj,num){overworld.runCommandAsync(`scoreboard players add ${name} ${obj} ${num}`)};//仨旧时代的产物
const az = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","★"];//az not is AZ
// const orxyz = [-704,0,-160];//核心参数，地牢起始坐标
// const where = the_end;      //核心参数，地牢所在维度     //丢到config里

/*
71@hkrpw
const orxyzLocation = new Location(-704,0,-160);//also
const ocxyzLocation = new Location(-544,0,0);   //also

scoreboard objectives add xdungon dummy xdungeon
scoreboard objectives add xdungon_rooms dummy xdungeon_rooms
scoreboard objectives add xdungon_dis dummy §e§l-地牢攻略积分-
scoreboard objectives add xdungon_boss dummy §e§l-地牢攻略Boss数目-

/scoreboard players add @a xdungon 1
*/
const orxyzLocation = new Location(orxyz[0],orxyz[1],orxyz[2]);             //also
const ocxyzLocation = new Location((orxyz[0]+160),orxyz[1],orxyz[2]+160);   //also 原点
const xocxyzLocation = new Location((orxyz[0]+167-1),orxyz[1]+9,orxyz[2]+167-1);   //also 平台落点

// const tConsole = initConsole(nether);//来自地狱的圣言哈哈哈哈哈哈哈艹
// 	  tConsole.injectConsole();

let gamecache = [];//字(mi)面意思
// -627 ~ -80
// -476 ~ 80
//


/*
;;;;;
//#1       北 N  z-   #2  @0
//         ^              @1
//         |              @2
//         |              @3
//         |              @4
//  《=====#=====》东 E X+ @5
//         |              @6
//         |              @7
//         |              @8
//         #              @9
//#4      难 S  z+    #3
//
//@_0_1_2_3_4_5_6_7_8_9@
//orxyz
// , , , , , , , , , , , , , , , , , , , , 
// , , , , , , , , , , , , , , , , , , , , 
// , , , , , , , , , , , , , , , , , , , ,
// , , , , , , , , , , , , , , , , , , , , 
// , , , , , , , , , ,c,=,1, , , , , , , ,
// , , , , , , , , , ,|, ,|, , , , , , , , 
// , , , , , , , , , ,d,=,c,=,1, , , , , ,
// , , , , , , , , , ,|, ,|, ,|, , , , , , 
// , , , , , , , ,d,=,e,=,d,=,c, , , , , ,
// , , , , , , , ,|, ,|, ,|, ,|, , , , , , 
// , , , , , ,1,=,c,=,f,=,e,=,1, , , , , ,
// , , , , , , , ,|, , , ,|, , , , , , , , 
// , , , , , , , ,1, , , ,d, , , , , , , ,
// , , , , , , , , , , , ,|, , , , , , , , 
// , , , , , , , , , ,1,=,c,=,★, , , , , ,
// , , , , , , , , , , , ,|, , , , , , , , 
// , , , , , , , , , , , ,1, , , , , , , ,
// , , , , , , , , , , , , , , , , , , , , 
// , , , , , , , , , , , , , , , , , , , ,
// , , , , , , , , , , , , , , , , , , , , 
// , , , , , , , , , , , , , , , , , , , ,
*/

let FIX = 1.0;
let tickingmain = function(){
	// FIX = Math.floor(Math.random() * 5)
	// try{where.runCommandAsync(`execute @a[tag=!xdungeon,m=s] ~ ~ ~ gamemode a`)}catch(err){}
	// try{where.runCommandAsync(`execute @a[tag=xdungeon,m=a] ~ ~ ~ gamemode s`)}catch(err){}
//满满的无奈
	let dungeonTickPlayersArray = [];
	{
		let __tess = {};//new EntityQueryOptions();
			__tess.location = ocxyzLocation;
			__tess.maxDistance = 225;
			__tess.type = "minecraft:player";

		let __tes = where.getEntities(__tess)

		for(let __ta of __tes){
			if( __ta.location.y<orxyz[1]+16 && __ta.location.y>orxyz[1] && __ta.dimension == where){
				//在场景附近，且在房间内，正常
				//mode->冒险
				
				try{__ta.runCommandAsync("gamemode adventure @s[m=survival]")}catch(err){
					the_end.runCommandAsync("me 8"+err)

				}
				
				dungeonTickPlayersArray.push(__ta)
				//console.log(__ta.typeId)
				//塞玩家入列表
				
				backTool.setxd("###xd###","the end",__ta);//专属死亡回溯,无了
			}else{
				//在场景附近，但不在房间内，处理掉
				//__ta.teleport(xocxyzLocation,where,0,0)
			}
		}
	}
	
	{
		let  xboyInRoom = {};//new EntityQueryOptions();
			 xboyInRoom.location = ocxyzLocation;
			 xboyInRoom.maxDistance = 225;
			 xboyInRoom.type = "minecraft:player";
		let xbayInRoom = {};//new EntityQueryOptions();
		xbayInRoom.type = "minecraft:player";

				let xboy  = [];
				let xbay  = [];
				for(let xb0y of where.getEntities(xboyInRoom)){if(xb0y.dimension == where) xboy.push(xb0y);};
				for(let xb0y of where.getEntities(xbayInRoom)){xbay.push(xb0y);};
					xbay.forEach((player)=>{
						if(!xboy.includes(player)){
							try{player.runCommandAsync(`gamemode survival @s[m=adventure]`)}catch(err){
								the_end.runCommandAsync("me 7"+err)

							}
							
						}
					})
	}//临时做场景保护用，冒险
	if(gamecache.length && dungeonTickPlayersArray.length){

		let dungeonTickRoomsArray = []
		{
			dungeonTickPlayersArray.forEach((__te)=>{
				let __txz = Chunk_Boundary_Point.x2D([__te.location.x,__te.location.z])
				gamecache.forEach((__te)=>{
					if(__te.x===__txz[0]&&__te.z===__txz[1]){dungeonTickRoomsArray.push(__te)}
				})
			})
		}

		dungeonTickRoomsArray.forEach((room,__tex)=>{
				let	 xboyInRoom = function(type){
				let  xboyInRoom = {};//new EntityQueryOptions();
					 xboyInRoom.location = new Location(room.x+7,orxyz[1]+2,room.z+7);
				 	 xboyInRoom.maxDistance = 12;
					 xboyInRoom.type = type;

						let xboy  = [];
					for(let xb0y of where.getEntities(xboyInRoom)){xboy.push(xb0y);};
					return  xboy.filter(xbay => xbay.location.x<=room.x+17 && xbay.location.x>=room.x-1 && xbay.location.y<=8 && xbay.location.y>=0 && xbay.location.z<=room.z+17 && xbay.location.z>=room.z-1 )
							  //再判是否在房间内
					}
				let xboyInRoomTurest = !xboyInRoom("minecraft:zombie").length && !xboyInRoom("minecraft:skeleton").length;
					xboyInRoom("minecraft:item").forEach((item)=>{
						item.addTag("xdungeon");
						item.runCommandAsync(`scoreboard players add @p[x=${room.x-1},y=${orxyz[1]},z=${room.z-1},dx=17,dy=17,dz=17] xdungon 1`);
						item.runCommandAsync(`scoreboard players add @p[x=${room.x-1},y=${orxyz[1]},z=${room.z-1},dx=17,dy=17,dz=17] xdungon_dis 1`);
					});//掉落物标记，图省事直接丢main里了
			///console.log(room.detail)


			if (room.status == 1 && room.detail == "★") {
				clear();
				rest();
				next();
				room.status = 0;
				dungeonTickRoomsArray[__tex] = room;
			}
			if (room.status == 2 && room.detail == "★") {
				room.status = 1;
				dungeonTickRoomsArray[__tex] = room;
			}
			if (room.status == 3 && room.detail == "★") {
				room.status = 2;
				dungeonTickRoomsArray[__tex] = room;
			}


			if(room.status == 1 && xboyInRoomTurest){
				try{
					xboyInRoom("minecraft:player").forEach((player)=>{
						player.runCommandAsync(`scoreboard players add @s xdungon_rooms 1`);
					})
					
				}catch(err){
					the_end.runCommandAsync("me 6"+err)

				}

				gate_fill_tool_xyzIDIDw.b(room.x, orxyz[1], room.z, "air", "[]", "nether_brick_fence", "[]", where)//芝麻开门
				where.spawnParticle("xboy:ttk_end",new Location(room.x-1,orxyz[1]+2,room.z+7.5),new MolangVariableMap())
				where.spawnParticle("xboy:ttk_end",new Location(room.x+7.5,orxyz[1]+2,room.z-1),new MolangVariableMap())
				where.spawnParticle("xboy:ttk_end",new Location(room.x+16,orxyz[1]+2,room.z+7.5),new MolangVariableMap())
				where.spawnParticle("xboy:ttk_end",new Location(room.x+7.5,orxyz[1]+2,room.z+16),new MolangVariableMap())
				// where.runCommandAsync(`particle xboy:ttk_end ${room.x-1  } ${orxyz[1]+2} ${room.z+7.5}`)
				// where.runCommandAsync(`particle xboy:ttk_end ${room.x+7.5} ${orxyz[1]+2} ${room.z-1  }`)
				// where.runCommandAsync(`particle xboy:ttk_end ${room.x+16 } ${orxyz[1]+2} ${room.z+7.5}`)
				// where.runCommandAsync(`particle xboy:ttk_end ${room.x+7.5} ${orxyz[1]+2} ${room.z+16 }`)
				room.status = 0;
				dungeonTickRoomsArray[__tex] = room;
			}
			if(room.status == 2 && xboyInRoomTurest){
				{
						gate_fill_tool_xyzIDIDw.a(room.x, orxyz[1], room.z, "nether_brick_fence", "[]", "air", "[]", where)
						where.spawnParticle("xboy:ttk",new Location(room.x+8,orxyz[1]+6.1,room.z+8),new MolangVariableMap())
						// where.runCommandAsync(`particle xboy:ttk ${room.x+8} ${orxyz[1]+6.1} ${room.z+8}`)
					for(let i = 3*FIX;i>0;){
						let x = Math.floor(Math.random() * 15);
						let z = Math.floor(Math.random() * 15);
						    i = Math.floor(Math.random() * 15)>8 ? i : i-1;
						where.spawnParticle("xboy:s",new Location(room.x+x,orxyz[1]+1,room.z+z),new MolangVariableMap())
						where.spawnEntity("minecraft:zombie",new Location(room.x+x,orxyz[1]+3,room.z+z))
						// where.runCommandAsync(`particle xboy:s ${room.x+x} ${orxyz[1]+1} ${room.z+z}`)
						// where.runCommandAsync(`summon minecraft:zombie ${room.x+x} ${orxyz[1]+3} ${room.z+z}`)
					}
					for(let i = 1*FIX*0.8;i>0;){
						let x = Math.floor(Math.random() * 15);
						let z = Math.floor(Math.random() * 15);
							i = x>8 ? i : i-1;
						where.spawnParticle("xboy:s",new Location(room.x+x,orxyz[1]+1,room.z+z),new MolangVariableMap())
						where.spawnEntity("minecraft:skeleton",new Location(room.x+x,orxyz[1]+3,room.z+z))
						// where.runCommandAsync(`particle xboy:s ${room.x+x} ${orxyz[1]+1} ${room.z+z}`)
						// where.runCommandAsync(`summon minecraft:skeleton ${room.x+x} ${orxyz[1]+3} ${room.z+z}`)
					}
				let xroom = room;
					xroom.status = Math.floor(Math.random() * 15)>4 ? 1 : 2;
				dungeonTickRoomsArray[__tex] = xroom;
				}
			}
			if(room.status == 3 && xboyInRoomTurest){
				where.spawnParticle("xboy:ttk",new Location(room.x+8,orxyz[1]+6.1,room.z+8),new MolangVariableMap())
				// where.runCommandAsync(`particle xboy:ttk ${room.x+8} ${orxyz[1]+6.1} ${room.z+8}`)
				for(let i = 2*FIX*0.8;i>0;){
					let x = Math.floor(Math.random() * 15);
					let z = Math.floor(Math.random() * 15);
						i = x>8 ? i : i-1;
					where.spawnParticle("xboy:s",new Location(room.x+x,orxyz[1]+1,room.z+z),new MolangVariableMap())
					where.spawnEntity("minecraft:zombie",new Location(room.x+x,orxyz[1]+3,room.z+z))
					// where.runCommandAsync(`particle xboy:s ${room.x+x} ${orxyz[1]+1} ${room.z+z}`)
					// where.runCommandAsync(`summon minecraft:zombie ${room.x+x} ${orxyz[1]+3} ${room.z+z}`)
				}
				for(let i = 1*FIX*0.8;i>0;){
					let x = Math.floor(Math.random() * 15);
					let z = Math.floor(Math.random() * 15);
						i = x>8 ? i : i-1;
						
					where.spawnParticle("xboy:s",new Location(room.x+x,orxyz[1]+1,room.z+z),new MolangVariableMap())
					where.spawnEntity("minecraft:skeleton",new Location(room.x+x,orxyz[1]+3,room.z+z))
					where.spawnEntity("minecraft:slime",new Location(room.x+x,orxyz[1]+3,room.z+z))
					// where.runCommandAsync(`particle xboy:s ${room.x+x} ${orxyz[1]+1} ${room.z+z}`)
					// where.runCommandAsync(`summon minecraft:skeleton ${room.x+x} ${orxyz[1]+3} ${room.z+z}`)
					// where.runCommandAsync(`summon minecraft:slime ${room.x+x} ${orxyz[1]+3} ${room.z+z}`)
				}
				gate_fill_tool_xyzIDIDw.a(room.x, orxyz[1], room.z, "nether_brick_fence", "[]", "air", "[]", where)
				
				let xroom = room;
				xroom.status = Math.floor(Math.random() * 15)>4 ? 2 : 3;
				dungeonTickRoomsArray[__tex] = xroom;
			}
		})
	}
}

/*
let temp = 0
let tempp = 0
*/

const backTool = {
	setxd : function (backTagMain,worldNameTag,player) {//待修
		//因为死亡后player不再在所选区域，于是不再触发此函数，导致死亡时无法触发此函数
		//地牢特供
		if(player.dimension != world.getDimension(worldNameTag)) return;
			let func = {
				tag: function (player) {
					player.getTags().forEach(
						tag => { if (tag.startsWith(backTagMain)) { player.removeTag(tag) } }
					)
				}
			};
			if (testDead(player) && player.location.y < 32767) {
				func.tag(player)
				player.addTag(backTagMain + worldNameTag + "#" + player.location.x.toFixed(1) + "#" + player.location.y.toFixed(1) + "#" + player.location.z.toFixed(1) + backTagMain)
			}

	},
	set : function (backTagMain,worlds) {
		//###xback###           worlds:String[]
		//在选定的维度里，用固定的tag标识符
		worlds.forEach(worldNameTag => {
			world.getDimension(worldNameTag).getPlayers().forEach(player => {
					let mode = "tag";//后面还要换储存方式
					let func = {
						tag: function (player) {
							player.getTags().forEach(
								tag => { if (tag.startsWith(backTagMain)) { player.removeTag(tag) } }
							)
						}
					};
					if(testDead(player) && player.location.y<32767){
													//掉虚空的给一个回去记坐标的机会
						                            //什么？y32767。。。。人死后不会上天堂，但真的的会上天
						func.tag(player)
						//									维度标识符#x#y#z
						player.addTag(backTagMain + worldNameTag + "#"  + player.location.x.toFixed(1) + "#" +  player.location.y.toFixed(1) + "#" +  player.location.z.toFixed(1) + backTagMain)
					}
				})
		})

	},
	get : function(backTagMain,worlds,players){
		//backTagMain:String
		//worlds:String[]
		//players:player[]
		//什么叫特色，这就叫特色
		//一个维度一个死亡回溯点
		//搭配有偿使用风味更佳哟
		players.forEach(player => {
			let i = 0;
			worlds.forEach(worldNameTag => {
				player.getTags().forEach(tag => {
						if (tag.startsWith(backTagMain + worldNameTag)) { let wxyz = tag.replaceAll(backTagMain, "").split("#"); player.teleport(new Location(+wxyz[1], +wxyz[2], +wxyz[3]), {dimension:world.getDimension(worldNameTag)});i++ } 

					})
			})
			if(!i){ player.sendMessage(`§e§l-所选维度无可用死亡回溯点`) }
		})

	},
	del : function(backTagMain,worlds,players){
		players.forEach(player => {
			let i = 0;
			worlds.forEach(worldNameTag => {
				player.getTags().forEach(tag => {
						if (tag.startsWith(backTagMain + worldNameTag)) {player.removeTag(tag);player.sendMessage(`§e§l-所选维度已清除死亡回溯点`);i++}
				})//CV是人类第一生产力
			})
			if(!i){ player.sendMessage(`§e§l-所选维度无可用死亡回溯点`) }
		})
	}
}


let __te = 0
world.events.tick.subscribe(() => {//我()了，这也是一种不（）

	// tConsole.update();
	
	tickingmain();
 	backTool.set(backTag,["the end","overworld"]);

	 [where].forEach((w)=>{
		w.getPlayers().forEach(player => {
	
			if(player.hasTag("xdungeon")){
	
				let x  = player.location.x
				let y  = player.location.y
				let z  = player.location.z
				for(let i = 6;i<48;){
					i=i+Math.floor(Math.random() * 4)
					w.spawnParticle("xboy:xendrod",new Location(x,+y.toFixed(0)+i,z),new MolangVariableMap())
					// player.runCommandAsync(`particle xboy:xendrod ${x} ${+y.toFixed(0)+i} ${z}`)
				}
				
			}
		})
	})

	__te++
	if(__te>25){__te=0;
[overworld,nether,the_end].forEach((w)=>{
	w.getPlayers().forEach(player => {

		if(player.hasTag("chunk")){
			let x  = player.location.x //>= 0 ? player.location.x-0.5 : player.location.x+0.5;
			let y  = player.location.y
			let z  = player.location.z //>= 0 ? player.location.z-0.5 : player.location.z+0.5;
			let xz =  Chunk_Boundary_Point.x2D([x,z]);

			// player.runCommandAsync(`particle minecraft:endrod ${xz[0]} ${y.toFixed(0)-1} ${xz[1]}`)
			// player.runCommandAsync(`particle minecraft:endrod ${xz[0]} ${y.toFixed(0)} ${xz[1]}`)
			// player.runCommandAsync(`particle minecraft:endrod ${xz[0]} ${y.toFixed(0)+1} ${xz[1]}`)
			// player.runCommandAsync(`particle minecraft:endrod ${xz[0]} ${y.toFixed(0)-1} ${xz[1]+15}`)
			// player.runCommandAsync(`particle minecraft:endrod ${xz[0]} ${y.toFixed(0)} ${xz[1]+15}`)
			// player.runCommandAsync(`particle minecraft:endrod ${xz[0]} ${y.toFixed(0)+1} ${xz[1]+15}`)
			// player.runCommandAsync(`particle minecraft:endrod ${xz[0]+15} ${y.toFixed(0)-1} ${xz[1]}`)
			// player.runCommandAsync(`particle minecraft:endrod ${xz[0]+15} ${y.toFixed(0)} ${xz[1]}`)
			// player.runCommandAsync(`particle minecraft:endrod ${xz[0]+15} ${y.toFixed(0)+1} ${xz[1]}`)
			// player.runCommandAsync(`particle minecraft:endrod ${xz[0]+15} ${y.toFixed(0)-1} ${xz[1]+15}`)
			// player.runCommandAsync(`particle minecraft:endrod ${xz[0]+15} ${y.toFixed(0)} ${xz[1]+15}`)
			// player.runCommandAsync(`particle minecraft:endrod ${xz[0]+15} ${y.toFixed(0)+1} ${xz[1]+15}`)
			// player.runCommandAsync(`particle minecraft:endrod ${xz[0]} ${y.toFixed(0)+2} ${xz[1]}`)
			// player.runCommandAsync(`particle minecraft:endrod ${xz[0]} ${y.toFixed(0)+3} ${xz[1]}`)
			// player.runCommandAsync(`particle minecraft:endrod ${xz[0]} ${y.toFixed(0)+4} ${xz[1]}`)
			// player.runCommandAsync(`particle minecraft:endrod ${xz[0]} ${y.toFixed(0)+2} ${xz[1]+15}`)
			// player.runCommandAsync(`particle minecraft:endrod ${xz[0]} ${y.toFixed(0)+3} ${xz[1]+15}`)
			// player.runCommandAsync(`particle minecraft:endrod ${xz[0]} ${y.toFixed(0)+4} ${xz[1]+15}`)
			// player.runCommandAsync(`particle minecraft:endrod ${xz[0]+15} ${y.toFixed(0)+2} ${xz[1]}`)
			// player.runCommandAsync(`particle minecraft:endrod ${xz[0]+15} ${y.toFixed(0)+3} ${xz[1]}`)
			// player.runCommandAsync(`particle minecraft:endrod ${xz[0]+15} ${y.toFixed(0)+4} ${xz[1]}`)
			// player.runCommandAsync(`particle minecraft:endrod ${xz[0]+15} ${y.toFixed(0)+2} ${xz[1]+15}`)
			// player.runCommandAsync(`particle minecraft:endrod ${xz[0]+15} ${y.toFixed(0)+3} ${xz[1]+15}`)
			// player.runCommandAsync(`particle minecraft:endrod ${xz[0]+15} ${y.toFixed(0)+4} ${xz[1]+15}`)
			// 为什么套y.toFixed(0)呢？
			//因为0溢事件
		}
	})
})
	}

})



function next(){
	// let x = -536;
	// let y = 8;
	// let z = 8;
	// orxyz[0]+16*v+8,8,orxyz[2]+16*u+8
	let x = orxyz[0]+16*10+8;
	let y = orxyz[1]+8;
	let z = orxyz[2]+16*10+8;
	// //particle /
	// where.runCommandAsync(`tellraw @a[tag=xdungeon] {"rawtext":[{"text":"§r§l⑨${0}"}]}`)
	where.runCommandAsync(`title @a[tag=xdungeon] title 恭喜，进入下一关`)
	where.runCommandAsync(`effect @a[tag=xdungeon] slow_falling 5 30 true`)
	where.runCommandAsync(`effect @a[tag=xdungeon] slowness 2 2 true`)
	where.spawnParticle("xboy:ttk_win_gold",new Location(x,y,z),new MolangVariableMap())
	where.spawnParticle("xboy:ttk_win_diamond",new Location(x,y,z),new MolangVariableMap())
	// where.runCommandAsync(`particle xboy:ttk_win_gold ${x} ${y} ${z}`)
	// where.runCommandAsync(`particle xboy:ttk_win_diamond ${x} ${y} ${z}`)

	where.spawnEntity("minecraft:fireworks_rocket",new Location(x+1.5,y,z+0.5))
	[1.5,0.5,-0.5].forEach(xp=>
		[1.5,0.5,-0.5,-1.5].forEach(zp=>where.spawnParticle("xboy:minecraft:endrod",new Location(x+xp,y.toFixed(0),z+zp),new MolangVariableMap()))
		)
	where.runCommandAsync(`summon minecraft:fireworks_rocket ${x+1.5} ${y} ${z+0.5}`)
	where.runCommandAsync(`summon minecraft:fireworks_rocket ${x+1.5} ${y} ${z-0.5}`)
	where.runCommandAsync(`summon minecraft:fireworks_rocket ${x-1.5} ${y} ${z+0.5}`)
	where.runCommandAsync(`summon minecraft:fireworks_rocket ${x-1.5} ${y} ${z-0.5}`)
	where.runCommandAsync(`summon minecraft:fireworks_rocket ${x+0.5} ${y} ${z+1.5}`)
	where.runCommandAsync(`summon minecraft:fireworks_rocket ${x-0.5} ${y} ${z+1.5}`)
	where.runCommandAsync(`summon minecraft:fireworks_rocket ${x+0.5} ${y} ${z-1.5}`)
	where.runCommandAsync(`summon minecraft:fireworks_rocket ${x-0.5} ${y} ${z-1.5}`)
}
function clear(){
	gamecache = [];
	tickLineCLEAR();//清空跑道
for(let u = 2;u<19;u++){
  for(let v = 2;v<19;v++){
	try {
	// Array.from(where.getPlayers())[0].teleportFacing({x:orxyz[0]+16*v+8,y:orxyz[1],z:orxyz[2]+16*u+8},
	// 	where,
	// 	{x:0,y:0,z:0},
	// 	false);
		
	  if(where.getBlock(new BlockLocation(orxyz[0]+16*v+8, orxyz[1], orxyz[2]+16*u+8))?.typeId != "minecraft:air" || true){
	 // if( true){
			// console.log({a:1,b:2,c:[99,1],[Symbol('symbol')]:'ok'})
			chunk_fill_tool_xYzIDw(orxyz[0]+16*v,[orxyz[1],orxyz[1]+6],orxyz[2]+16*u,"air","[]",where)
		   }

	} catch (err) {
		the_end.runCommandAsync("me 5"+err)

	}

	  }
}
}

function rest(){
	
	let u21v21;
	let level = 5;
	for(let i = 0;i==0;){let xb0y = xboy(level);if(xb0y){
		let a = {x:90,y:90,u:0,v:0}
		let w = 0;
		//w用于判断最少房间数
		//a用于保持起始房间与终点距离
		for(let u = 2;u<19;u++){
			 for(let v = 2;v<19;v++){
				if(xb0y[u][v] != " " && xb0y[u][v] != "|" && xb0y[u][v] != "="){w++}
				if(xb0y[u][v] == az[level]){a.x = u;a.y = v}
				if(xb0y[u][v] == "★"     ){a.u = u;a.v = v}
			}
		}
		let x = a.x>a.u ? a.x-a.u : a.u-a.x;
		let y = a.y>a.v ? a.y-a.v : a.v-a.y;
		if(x+y>6 && x+y<30 && w>15){i++;u21v21=xb0y;
			//console.log(a,"#x:",x,"#y:",y,"#w:",w)
	}
	};};
	let a = "/u000a"
	for(let u = 2;u<19;u++){

		 //where.runCommandAsync(`me ${u21v21[u]}`)
			 //console.log(u21v21[u].join())
			 try{
			 the_end.runCommandAsync(`tellraw @a[tag=xdungeon] {"rawtext":[{"text":"§r§l⑨${u21v21[u].join(" ").replace("★","§e★§r§l")}"}]}`)
			 a += "\x1b[1m"+u21v21[u].join(" ").replace("★","\x1b[1;33m★\x1b[0m")+"\u000a";
			//  console.error('`§r§l⑨${u21v21[u].join(" ").replace("★","§e★§r§l")}`')
			 }catch(err){
				the_end.runCommandAsync("me 4"+err)
			 }
			
			//  console.info(`§r§l⑨${u21v21[u].join(" ").replace("★","§e★§r§l")}`)
  		 for(let v = 2;v<19;v++){
			   let roomDetail = u21v21[u][v];
		 if(roomDetail != " "){
		 //我是憨批，复制的忘记改了
			if(az.indexOf(roomDetail) != -1 && u21v21[u][v-1] == " "){wall_fill_tool_xyzIDw(orxyz[0]+16*v, orxyz[1], orxyz[2]+16*u, "deepslate_bricks", "[]", where, 0);}
			if(az.indexOf(roomDetail) != -1 && u21v21[u-1][v] == " "){wall_fill_tool_xyzIDw(orxyz[0]+16*v, orxyz[1], orxyz[2]+16*u, "deepslate_bricks", "[]", where, 1);}
			if(az.indexOf(roomDetail) != -1 && u21v21[u][v+1] == " "){wall_fill_tool_xyzIDw(orxyz[0]+16*v, orxyz[1], orxyz[2]+16*u, "deepslate_bricks", "[]", where, 2);}
			if(az.indexOf(roomDetail) != -1 && u21v21[u+1][v] == " "){wall_fill_tool_xyzIDw(orxyz[0]+16*v, orxyz[1], orxyz[2]+16*u, "deepslate_bricks", "[]", where, 3);}
			//崩了。习惯了
			//喵喵喵？
			if(roomDetail == "=" || roomDetail == "|"){
			aisle_fill_tool_xyzIDwm(orxyz[0]+16*v, orxyz[1], orxyz[2]+16*u, "deepslate_bricks", "[]", where, roomDetail)

			}else{
			if(roomDetail == "★"){
			
			gamecache.push({x:orxyz[0]+16*v,z:orxyz[2]+16*u,detail:roomDetail,status:3})
			chunk_fill_tool_xYzIDw(orxyz[0]+16*v, [orxyz[1],orxyz[1]], orxyz[2]+16*u, "cracked_deepslate_tiles", "[]", where)
			}else{
			if(roomDetail == az[level]){

			chunk_fill_tool_xYzIDw(orxyz[0]+16*v, [orxyz[1],orxyz[1]], orxyz[2]+16*u, "deepslate_tiles", "[]", where)
			// where.runCommandAsync(`me  ${v} 8 ${u}`)
			try{
				{
					let __tess = {};//new EntityQueryOptions();
						__tess.type = "minecraft:player";
						__tess.tags = ["xdungeon"];
			
					let __tes = where.getEntities(__tess)
			
					for(let __ta of __tes){
						if(__ta.dimension === where){
						__ta.teleport(new Location(orxyz[0]+16*v+8-1,8,orxyz[2]+16*u+8-1),{dimension:where})
						//__ta.addEffect()//真拉跨
						__ta.runCommandAsync(`effect @s slow_falling 5 0 true`)
						__ta.runCommandAsync(`effect @s slowness 2 2 true`)
						}

					}
					//猜猜这块哪复制来的
				}
			//where.runCommandAsync(`tp @a[tag=xdungeon] ${orxyz[0]+16*v+8} 8 ${orxyz[2]+16*u+8}`)

			}catch(err){}
			}else{//垃圾游戏，又崩了
				
				gamecache.push({x:orxyz[0]+16*v,z:orxyz[2]+16*u,detail:roomDetail,status:3})
				chunk_fill_tool_xYzIDw(orxyz[0]+16*v, [orxyz[1],orxyz[1]], orxyz[2]+16*u, "deepslate_tiles", "[]", where)//deepslate_gold_ore      cobbled_deepslate    chiseled_deepslate  
				xboy_fill_tool_xyzIDw[az[Math.floor(Math.random() * 25)]](orxyz[0]+16*v, orxyz[1], orxyz[2]+16*u, "deepslate_bricks", "[]", where)//生成房间内隔断
				xboy_fill_tool_xyzIDw[az[Math.floor(Math.random() * 25)]](orxyz[0]+16*v, orxyz[1], orxyz[2]+16*u, "deepslate_bricks", "[]", where)//生成房间内隔断
				xboy_fill_tool_xyzIDw.xboy(orxyz[0]+16*v, orxyz[1], orxyz[2]+16*u, "air", "[]", where)
				
			} 
			}//嘛耶，if瀑布
		   }//  高血压上来了                                                                                               
		}//整平，我不觉，心不烦
	  }
}

console.error(a)

try{where.runCommandAsync(`tellraw @a[tag=xdungeon] {"rawtext":[{"text":"§e§l-房间数量；${gamecache.length}"}]}`)}catch(err){
	the_end.runCommandAsync("me 3"+err)
}
}

clear();
rest();


const helperList = [
	"---以下使用皆需满足前提条件---",
	"- 地牢开 => 一切的前提",
	"- 进牢",
	"- 开牢",
	"- 出牢",
	"- 坐牢",
	"- 探牢 或 探监 => 进入被栅栏封闭的房间",
	"- 牢底 或 案底",
	"- 待更新",
	"- 待更新",
	"- 待更新",
];
world.events.chat.subscribe(msg => {

const {message} = msg;
/*
if(message == "..xd clear" && msg.sender.hasTag("xboy")){msg.message = "清场中....";clear()}
if(message == "..xd rest"  && msg.sender.hasTag("xboy")){msg.message = "生成中...."; rest()}
if(message == "..xd back"  && msg.sender.hasTag("xboy")){msg.message = "进牢中...."; msg.sender.teleport(xocxyzLocation,where,0,0)}
*/
//
//console.log(msg.sender.getEntitiesFromViewVector()[0].getComponents())
if (message == '..back del'){backTool.del(backTag,wholeWorld,[msg.sender]);}
if (message == '..back'){backTool.get(backTag,wholeWorld,[msg.sender]);}
if (message == '..xd back'){backTool.get("###xd###","the end",[msg.sender]);}

if(message == "..xd clear"){msg.message = "清场中...."; clear()}
if(message == "..xd rest" ){msg.message = "生成中...."; rest() }
if(message == "..xd start"){msg.message = "进牢中...."; msg.sender.teleport(xocxyzLocation,{dimension:where})}


if(message == "地牢帮助"){
	// msg.cancel = true;
	helperList.forEach(text=>{
		msg.sender.sendMessage(`§e§l+]${text}`)
	})
}
if(message.startsWith("难度调整")){FIX = +message.replace("难度调整","");msg.message = "难度调整为；"+FIX}
if(message == "坐牢" && msg.sender.hasTag("xdungeon") ){msg.message = "爷又回来辣！！！！";backTool.get("###xback###",["the end","overworld"],[msg.sender]);msg.sender.runCommandAsync(`xp -1L`)}
if(message == "清牢" && msg.sender.hasTag("xdungeon") && msg.sender.dimension === where){msg.message = "清场中....";clear()   }
if(message == "开牢" && msg.sender.hasTag("xdungeon") && msg.sender.dimension === where){msg.message = "清场中....请等待生成";clear();setCountRest() ; rest()   }
if(message == "出牢" && msg.sender.dimension === where){msg.sender.kill()}
if(message == "进牢" && msg.sender.hasTag("xdungeon") ){msg.message = "进牢中...."; msg.sender.teleport(xocxyzLocation,{dimension:where})}

if((message == "探牢" || message == "探监") && msg.sender.hasTag("xdungeon") && msg.sender.dimension === where){
	// msg.cancel  = true;
	let x = msg.sender.location.x;
	let z = msg.sender.location.z;
	// try{
	[
		[-4,0],
		[0,-4],
		[ 4,0],
		[0, 4]
	].forEach((xz)=>{
		gamecache.every((room)=>{
			// msg.sender.runCommandAsync(`me tp gamecache`+gamecache.length);

			let uv = Chunk_Boundary_Point.x2D([x+xz[0],z+xz[1]])
			// msg.sender.runCommandAsync(`me ${uv[0]} ${room.x}  ${uv[1] } ${room.z}`);

			if(uv[0] == room.x && uv[1] == room.z){
			// msg.sender.runCommandAsync(`me done`);

				// msg.sender.runCommandAsync(`tp @s ${room.x+7} ${orxyz[1]+2} ${room.z+8}`);
				msg.sender.teleport({x:room.x+7 ,y: orxyz[1]+2 , z:room.z+8});
				// +7 又 +8,文明是√8
			// 	throw new Error("为了让forEach中断减少性能开销，我加了个try，怎么想的");
				return;
			}
			return true;
		})
	})

	// }catch(err){
	// 	the_end.runCommandAsync("me 2"+err)

	// }
}
if(message == "牢底" || message == "案底"){
	// msg.cancel  = true;
	msg.sender.sendMessage(msg.sender.nameTag)
	msg.sender.sendMessage(`§e§l-地牢攻略积分- ${ScoreBase.GetPoints("xdungon_dis",msg.sender.nameTag)}`)
	// msg.sender.sendMessage(`§e§l-地牢攻略数量- ${ScoreBase.GetPoints( "xdungon_rooms",msg.sender.name)}`)
	// msg.sender.sendMessage(`§e§l-现可兑换积分- ${ScoreBase.GetPoints( "xdungon",msg.sender.name)}`)
}

//gamecache.forEach((room)=>{console.log(room.x,"#",room.z)})

})




/*
// 开始-> 是否已经开始-> 清场-> 预定坐标加载初始房间
// ->确认参加玩家名单-> addTag
// ->将参与玩家tp进场-> 游戏->
// #->死亡->房间内有玩家->仍有则游戏继续
// #->死亡->房间内无玩家->游戏结束
// ##->结算
// ->房间阶段结束判定:
// ###->没有怪物三秒钟->生成新房间-将新房间位置返回-保存在gt临时变量中
// ###
// -初始房间-概率生成五级或四级房间-北门
// -五级房间-除南门外随机选择2-3个门生成四级到三级房间
// -四级
// -三级
// -二级
// -一级
*/


// try {

// } catch (error) {
// 	overworld.runCommandAsync("me 1"+error)
// }



console.error("生成器加载完毕")




// overworld.runCommandAsync("me errorerror")
//forEach是坏文明吗