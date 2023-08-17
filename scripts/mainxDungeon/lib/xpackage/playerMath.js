// import { world } from "@minecraft/server";


let taIpingJiAn = [];//字面意思,顺赠高血压老年痴呆浑身欠打命名法
let taI = 0;
world.events.tick.subscribe(() => {//我()了，这也是一种不（）
taI++;
if(taI>20){
	taI = 0;
	taIpingJiAn = [];
}
})
const testDead = function(player){
	if(taIpingJiAn.some(n=>n==player.nameTag)){
		return false;
	}else{
		taIpingJiAn.push(player.nameTag);
		return player.getComponent("health").current == 0
	}
};

const getPlayers = function(where){ // 一种不是很优雅的获取玩家列表并以数组方式返回的方式
	let playersArray = []
	   for(let player of where.getPlayers()){
           if(player.dimension === where)
		  playersArray.push(player)
	   }
	   return playersArray;
};
export { testDead, getPlayers };