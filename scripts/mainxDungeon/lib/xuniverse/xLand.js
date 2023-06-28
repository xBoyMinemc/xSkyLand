// import { BlockLocation, MinecraftBlockTypes, world } from "@minecraft/server";
import Chunk_Boundary_Point from '../xpackage/chunkMath.js';
import { orxyz, where }                  from '../xuniverse/xconfig.js';                    //配置变量
//############################################################################
//who
// const overworld = world.getDimension("overworld");
const nether = world.getDimension("nether");
const the_end = world.getDimension("the end");
 
// world.events.beforeChat.subscribe(msg => {

//    const {message} = msg

// })

let tickLineSetsortObject = {};
let tickLineSet_sortArray = [];
let tickLineSetblockArray = [];
let tickLineSetblockFunct = function(x,y,z,block,data,who){
   //who.runCommandAsync(`me DEBUG-tickLineSetblockFunct-${x} ${y} ${z} ${block} ${data}`)
   who.runCommandAsync(`setblock ${x} ${y} ${z} ${block} ${data}`)
}


let tickLineReplaceArray = [];
let tickLineReplaceFunct = function (x,y,z,u,v,w,blockA,dataA,blockB,dataB,who){
      //who.runCommandAsync(`me DBUG-tickLineReplaceFunct-${x} ${y} ${z} ${u} ${v} ${w} ${blockA} ${dataA} replace ${blockB} ${dataB}`);

      who.runCommandAsync(`fill ${x} ${y} ${z} ${u} ${v} ${w} ${blockA} ${dataA} replace ${blockB} ${dataB}`);
      //u know,xboy is an adjective.so,let us xboy blocks.
      block_xboy_tool_xyzuvwIDw(x,y,z,u,v,w,blockA,dataA,who)
}


let tickLineFillArray = []
let tickLineFillFunct = function (x,y,z,u,v,w,block,data,who){
   // who.runCommandAsync(`me ${x} ${y} ${z} ${u} ${v} ${w} ${block} ${data} replace`);
   who.runCommandAsync(`fill ${x} ${y} ${z} ${u} ${v} ${w} ${block} ${data} replace`);

   block_xboy_tool_xyzuvwIDw(x,y,z,u,v,w,block,data,who)

}

let tickLineCLEAR = function(){  //清空队列
      tickLineReplaceArray = [];
      tickLineFillArray    = [];
      tickLineSetblockArray= [];
      setCount.fix         = 0 ;
}

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
//@_0_1_2_3_4_5_6_7_8_9_@

let setCount = {
   a:0, //set队列完成数
   z:0, //辅助
   max:0,
   unmax:0,
   c:0,
   fix:0   //决定是否跑 set队列
}
function setCountRest(){
   setCount = {
      a:0, //set队列完成数
      z:0, //辅助
      max:0,
      unmax:0,
      c:0,
      fix:0   //决定是否跑 set队列
   }
}
let xy = 0;
let FIX = 1.0;
const block_xboy_tool_xyzuvwIDw = function(x,y,z,u,v,w,block,data,who){
         const blocks = ["deepslate_bricks","deepslate_tiles", "cracked_deepslate_tiles"];
         if(blocks.some(b=>b==block)){
               let a = x > u ? x - u : (x == u ? 1 : u - x);
               let b = y > v ? y - v : (y == v ? 1 : v - y);
               let c = z > w ? z - w : (z == w ? 1 : w - z);
               function xb0y(xbay,xbry,xbdy,xbiy) {
                  // let FIX = 1.6;
                  for (let i = (a * b * c).toFixed(0); i >= 0; i--) {
                     let xboy = Math.random();
                     if (xboy < xbay*FIX && xboy > xbiy){

                        let xa = x - Math.floor(Math.random() * (x - u));
                        let xb = y - Math.floor(Math.random() * (y - v));
                        let xc = z - Math.floor(Math.random() * (z - w));
                        //who.runCommandAsync(`setblock ${a} ${b} ${c} ${xbry} 0`)
                        //我选择外包.
                        if(!tickLineSetsortObject[[xa,xb,xc]]){
                           tickLineSetsortObject[[xa,xb,xc]] = []
                        }
                        tickLineSetsortObject[[xa,xb,xc]].push([xa, xb, xc, xbry, xbdy, who])
                        tickLineSetblockArray.push([xa, xb, xc, xbry, xbdy, who])

                     }
                  }
               }
               // the_end.runCommandAsync("me data "+data)
            if(block=="deepslate_tiles"  && data=="[]"){//floor
               xb0y(0.10, "deepslate_gold_ore","[]",    0)
               xb0y(0.08, "deepslate_redstone_ore","[]",0)
               xb0y(0.22,"cracked_deepslate_tiles","[]",0)
               xb0y(0.11, "polished_deepslate","[]",    0)
               xb0y(0.11, "cobbled_deepslate" ,"[]",    0)
               xb0y(0.10,"barrier","[]",0)
            }
            if(block=="cracked_deepslate_tiles" && data=="[]"){
               xb0y(0.34,"deepslate_gold_ore","[]",0)
               xb0y(0.34,"gold_block","[]",        0)
            }
            if(block=="deepslate_bricks" && data=="[]"){
               xb0y(0.007,"glowstone" ,"[]",0)
               xb0y(0.005,"sealantern","[]",0)
               xb0y(0.22,"cracked_deepslate_bricks","[]",0)
               xb0y(0.04,"deepslate_brick_slab","[]",0)
               xb0y(0.04,"deepslate_brick_slab","[]",0)
               if(!(y==orxyz[1] && y==v)){            //啊吧，地板不给开air洞，防掉
               xb0y(0.10,"air","[]",0)
               }else{
               xb0y(0.10,"barrier","[]",0)
               }
            }
         }
}

// try{

world.events.tick.subscribe(i => {
setCount.fix++;
if(setCount.fix>5 && !tickLineFillArray.length && !tickLineReplaceArray.length){
   setCount.fix=0;
   if(tickLineSetsortObject){

   Object.keys(tickLineSetsortObject).forEach((key) => {
      if (tickLineSetsortObject[key].length == 1) {
         tickLineSetblockArray.push(tickLineSetsortObject[key][0])
      } else {
         tickLineSetblockArray.push(tickLineSetsortObject[key][Math.floor(Math.random() * [key].length)])
      }
      tickLineSetsortObject[key] = undefined;
   })
   tickLineSetsortObject = {}
   }

}
   try {
      for (let i = 0; i < 5; i++) {
         if (tickLineFillArray.length > 0) {
            let l = tickLineFillArray[0]; tickLineFillArray.shift(); tickLineFillFunct(l[0], l[1], l[2], l[3], l[4], l[5], l[6], l[7], l[8]);
         }
      }
   } catch (err) {
      //有报错憋着
   // the_end.runCommandAsync("me "+err)

   }
   try{
      for (let i = 0; i < 4; i++) {
         if (tickLineReplaceArray.length > 0) {
            let l = tickLineReplaceArray[0]; tickLineReplaceArray.shift(); tickLineReplaceFunct(l[0], l[1], l[2], l[3], l[4], l[5], l[6], l[7], l[8], l[9], l[10]);
         }
      }

   }catch(err){
      // the_end.runCommandAsync("me "+err)

   }

       setCount.unmax = tickLineSetblockArray.length;
   if (setCount.max < setCount.unmax ) { setCount.max = setCount.unmax };
   if (!tickLineFillArray.length && !tickLineReplaceArray.length && !!tickLineSetblockArray.length) {

      // the_end.runCommandAsync("me "+tickLineFillArray.length)
      // the_end.runCommandAsync("me "+tickLineReplaceArray.length)
      // the_end.runCommandAsync("me "+tickLineSetblockArray.length)

      for (let i = 64; i > 0; i--) {
         try {
            
         let l = tickLineSetblockArray.pop(); tickLineSetblockFunct(l[0], l[1], l[2], l[3], l[4], l[5]);
         } catch (err) {
            // the_end.runCommandAsync("me "+err)
         }
         //由此得来的数据虽然模糊，但也够看
         setCount.a++
      }
   }
  

   if(setCount.a!=setCount.z&&setCount.a){the_end.runCommandAsync(`title @a[tag=xdungeon,rm=1] actionbar §e§l生成进度:§3${setCount.a} # ${((setCount.a/(setCount.max))*100).toFixed(1)}%`);setCount.z=setCount.a}
   //if(setCount.a!=setCount.z&&setCount.a){the_end.runCommandAsync(`title @a[tag=xdungeon,rm=1] actionbar §e§l生成进度:§3${setCount.a} # ${setCount.max} # ${((setCount.a/(setCount.max))*100).toFixed(1)}% # ${setCount.c} #fix ${setCount.fix}`);setCount.z=setCount.a}
   if(!tickLineSetblockArray.length){setCount.a=0;setCount.unmax=0;setCount.max=setCount.unmax;}//复位

})

// }catch(err){
//    the_end.runCommandAsync("me "+err)
// };
const chunk_fill_tool_xYzIDw  = function ( x, work_y, z, blockId, blockData, who){
   
   const xz1 = Chunk_Boundary_Point.x2D([x,z])
   const xz3 = [ xz1[0]+15, xz1[1]+15 ]
   for(let i = work_y.length-2;i>-1;i--){tickLineFillArray.push([ xz1[0] ,work_y[i+1] ,xz1[1] ,xz3[0] ,work_y[i] ,xz3[1] ,blockId ,blockData ,who ]);}
   
};

const aisle_fill_tool_xyzIDwm = function( x, y, z, blockId, blockData, who, mode){
   
   let xz1 = Chunk_Boundary_Point.x2D([x,z])
   let xz3 = [10000,10000]
   if(mode == "|"){
      tickLineFillArray.push([ xz1[0] ,y+1 ,xz1[1] ,xz1[0]+5 ,y+4 ,xz1[1] ,blockId ,blockData ,who ])
      tickLineFillArray.push([ xz1[0]+9 ,y+1 ,xz1[1] ,xz1[0]+15 ,y+4 ,xz1[1] ,blockId ,blockData ,who ])
      tickLineFillArray.push([ xz1[0] ,y+1 ,xz1[1]+15 ,xz1[0]+5 ,y+4 ,xz1[1]+15 ,blockId ,blockData ,who ])
      tickLineFillArray.push([ xz1[0]+9 ,y+1 ,xz1[1]+15 ,xz1[0]+15 ,y+4 ,xz1[1]+15 ,blockId ,blockData ,who ])

      xz1[0] += 6;
      xz3[0]  = xz1[0] + 3;
      xz3[1]  = xz1[1] + 15;
      
      tickLineFillArray.push([ xz1[0] ,y+1 ,xz1[1] ,xz1[0] ,y+4 ,xz3[1] ,blockId ,blockData ,who ])
      tickLineFillArray.push([ xz3[0] ,y+1 ,xz1[1] ,xz3[0] ,y+4 ,xz3[1] ,blockId ,blockData ,who ])
   };
   if(mode == "="){
      tickLineFillArray.push([ xz1[0] ,y+1 ,xz1[1] ,xz1[0] ,y+4 ,xz1[1]+5 ,blockId ,blockData ,who ])
      tickLineFillArray.push([ xz1[0] ,y+1 ,xz1[1]+9 ,xz1[0] ,y+4 ,xz1[1]+15 ,blockId ,blockData ,who ])
      tickLineFillArray.push([ xz1[0]+15 ,y+1 ,xz1[1] ,xz1[0]+15 ,y+4 ,xz1[1]+5 ,blockId ,blockData ,who ])
      tickLineFillArray.push([ xz1[0]+15 ,y+1 ,xz1[1]+9 ,xz1[0]+15 ,y+4 ,xz1[1]+15 ,blockId ,blockData ,who ])
      
      xz1[1] += 6;
      xz3[1]  = xz1[1] + 3;
      xz3[0]  = xz1[0] + 15;
      
      tickLineFillArray.push([ xz1[0] ,y+1 ,xz1[1] ,xz3[0] ,y+4 ,xz1[1] ,blockId ,blockData ,who ])
      tickLineFillArray.push([ xz1[0] ,y+1 ,xz3[1] ,xz3[0] ,y+4 ,xz3[1] ,blockId ,blockData ,who ])
   };
   //who.runCommandAsync(`me ${xz1[0]} ${y} ${xz1[1]} ${xz3[0]} ${y} ${xz3[1]} `)
   tickLineFillArray.push([ xz1[0] ,y ,xz1[1] ,xz3[0] ,y ,xz3[1] ,blockId ,blockData ,who ])
   
}

const wall_fill_tool_xyzIDw = function (x, y, z, blockId, blockData, who, mode){

   let xz1 = Chunk_Boundary_Point.x2D([x,z])
   
   if(mode == 0){tickLineFillArray.push([ xz1[0]-1 ,y+1 ,xz1[1] ,xz1[0]-1 ,y+4 ,xz1[1]+15 ,blockId ,blockData ,who ]);}
   if(mode == 1){tickLineFillArray.push([ xz1[0] ,y+1 ,xz1[1]-1 ,xz1[0]+15 ,y+4 ,xz1[1]-1 ,blockId ,blockData ,who ]);}
   if(mode == 2){tickLineFillArray.push([ xz1[0]+16 ,y+1 ,xz1[1] ,xz1[0]+16 ,y+4 ,xz1[1]+15 ,blockId ,blockData ,who ]);}
   if(mode == 3){tickLineFillArray.push([ xz1[0] ,y+1 ,xz1[1]+16 ,xz1[0]+15 ,y+4 ,xz1[1]+16 ,blockId ,blockData ,who ]);}

}

const gate_fill_tool_xyzIDIDw = {
   //房间门开关
   a: function (x, y, z, blockIdA, blockDataA, blockIdB, blockDataB, who){

      let xz1 = Chunk_Boundary_Point.x2D([x,z])

         tickLineReplaceArray.push([ xz1[0]-1 ,y+1 ,xz1[1]+7 ,xz1[0]-1 ,y+4 ,xz1[1]+8 ,blockIdA ,blockDataA,blockIdB, blockDataB ,who ]);
         tickLineReplaceArray.push([ xz1[0]+7 ,y+1 ,xz1[1]-1 ,xz1[0]+8 ,y+4 ,xz1[1]-1 ,blockIdA ,blockDataA,blockIdB, blockDataB ,who ]);
         tickLineReplaceArray.push([ xz1[0]+16 ,y+1 ,xz1[1]+7 ,xz1[0]+16 ,y+4 ,xz1[1]+8 ,blockIdA ,blockDataA,blockIdB, blockDataB ,who ]);
         tickLineReplaceArray.push([ xz1[0]+7 ,y+1 ,xz1[1]+16 ,xz1[0]+8 ,y+4 ,xz1[1]+16 ,blockIdA ,blockDataA,blockIdB, blockDataB ,who ]);

  },         
  b: function (x, y, z, blockIdA, blockDataA, blockIdB, blockDataB, who){

   let xz1 = Chunk_Boundary_Point.x2D([x,z])

      tickLineReplaceArray.push([ xz1[0]-1 ,y+1 ,xz1[1]+7 ,xz1[0]-1 ,y+3 ,xz1[1]+8 ,blockIdA ,blockDataA,blockIdB, blockDataB ,who ]);
      tickLineReplaceArray.push([ xz1[0]+7 ,y+1 ,xz1[1]-1 ,xz1[0]+8 ,y+3 ,xz1[1]-1 ,blockIdA ,blockDataA,blockIdB, blockDataB ,who ]);
      tickLineReplaceArray.push([ xz1[0]+16 ,y+1 ,xz1[1]+7 ,xz1[0]+16 ,y+3 ,xz1[1]+8 ,blockIdA ,blockDataA,blockIdB, blockDataB ,who ]);
      tickLineReplaceArray.push([ xz1[0]+7 ,y+1 ,xz1[1]+16 ,xz1[0]+8 ,y+3 ,xz1[1]+16 ,blockIdA ,blockDataA,blockIdB, blockDataB ,who ]);

},
}

const xboy_fill_tool_xyzIDw = {
   //空
   a : function(x,y,z,block,data,who){null},
   ///大十字
   b : function(x,y,z,block,data,who){
      tickLineFillArray.push([x+2,y+1,z+7,x+13,y+3,z+7,block,data,who]);
      tickLineFillArray.push([x+7,y+1,z+2,x+7,y+4,z+13,block,data,who]);
   },
   ///一横中
   c : function(x,y,z,block,data,who){
      tickLineFillArray.push([x+2,y+1,z+7,x+13,y+3,z+7,block,data,who]);
   },
   ///一竖中
   d : function(x,y,z,block,data,who){
      tickLineFillArray.push([x+7,y+1,z+2,x+7,y+4,z+13,block,data,who]);
   },
   ///二横
   e : function(x,y,z,block,data,who){
      tickLineFillArray.push([x+2,y+1,z+3,x+13,y+3,z+3,block,data,who]);
      tickLineFillArray.push([x+2,y+1,z+7,x+13,y+3,z+7,block,data,who]);
   },
   ///二竖
   f : function(x,y,z,block,data,who){
      tickLineFillArray.push([x+3,y+1,z+2,x+3,y+4,z+13,block,data,who]);
      tickLineFillArray.push([x+7,y+1,z+2,x+7,y+4,z+13,block,data,who]);
   },
   ///二横中
   g : function(x,y,z,block,data,who){
      tickLineFillArray.push([x+2,y+1,z+3,x+13,y+3,z+3,block,data,who]);
      tickLineFillArray.push([x+2,y+1,z+11,x+13,y+3,z+11,block,data,who]);
   },
   ///二竖中
   h : function(x,y,z,block,data,who){
      tickLineFillArray.push([x+3,y+1,z+2,x+3,y+4,z+13,block,data,who]);
      tickLineFillArray.push([x+11,y+1,z+2,x+11,y+4,z+13,block,data,who]);
   },
   ///三横
   i : function(x,y,z,block,data,who){
      tickLineFillArray.push([x+2,y+1,z+3,x+13,y+3,z+3,block,data,who]);
      tickLineFillArray.push([x+2,y+1,z+7,x+13,y+3,z+7,block,data,who]);
      tickLineFillArray.push([x+2,y+1,z+11,x+13,y+3,z+11,block,data,who]);
   },
   ///三竖
   j : function(x,y,z,block,data,who){
      tickLineFillArray.push([x+3,y+1,z+2,x+3,y+4,z+13,block,data,who]);
      tickLineFillArray.push([x+7,y+1,z+2,x+7,y+4,z+13,block,data,who]);
      tickLineFillArray.push([x+11,y+1,z+2,x+11,y+4,z+13,block,data,who]);
   },
   ///一横中左半
   k : function(x,y,z,block,data,who){
      tickLineFillArray.push([x+2,y+1,z+7,x+7,y+3,z+7,block,data,who]);
   },
   ///一竖中左半
   l : function(x,y,z,block,data,who){
      tickLineFillArray.push([x+7,y+1,z+2,x+7,y+4,z+7,block,data,who]);
   },
   ///二横左半
   m : function(x,y,z,block,data,who){
      tickLineFillArray.push([x+2,y+1,z+3,x+7,y+3,z+3,block,data,who]);
      tickLineFillArray.push([x+2,y+1,z+7,x+13,y+3,z+7,block,data,who]);
   },
   ///二竖左半
   n : function(x,y,z,block,data,who){
      tickLineFillArray.push([x+3,y+1,z+2,x+3,y+4,z+7,block,data,who]);
      tickLineFillArray.push([x+7,y+1,z+2,x+7,y+4,z+7,block,data,who]);
   },
   ///二横中左半
   o : function(x,y,z,block,data,who){
      tickLineFillArray.push([x+2,y+1,z+3,x+7,y+3,z+3,block,data,who]);
      tickLineFillArray.push([x+2,y+1,z+11,x+7,y+3,z+11,block,data,who]);
   },
   ///二竖中左半
   p : function(x,y,z,block,data,who){
      tickLineFillArray.push([x+3,y+1,z+2,x+3,y+4,z+7,block,data,who]);
      tickLineFillArray.push([x+11,y+1,z+2,x+11,y+4,z+7,block,data,who]);
   },
   ///三横左半
   q : function(x,y,z,block,data,who){
      tickLineFillArray.push([x+2,y+1,z+3,x+7,y+3,z+3,block,data,who]);
      tickLineFillArray.push([x+2,y+1,z+7,x+7,y+3,z+7,block,data,who]);
      tickLineFillArray.push([x+2,y+1,z+11,x+7,y+3,z+11,block,data,who]);
   },
   ///三竖左半
   r : function(x,y,z,block,data,who){
      tickLineFillArray.push([x+3,y+1,z+2,x+3,y+4,z+7,block,data,who]);
      tickLineFillArray.push([x+7,y+1,z+2,x+7,y+4,z+7,block,data,who]);
      tickLineFillArray.push([x+11,y+1,z+2,x+11,y+4,z+7,block,data,who]);
   },
   ///一横中右半
   s : function(x,y,z,block,data,who){
      tickLineFillArray.push([x+7,y+1,z+7,x+13,y+3,z+7,block,data,who]);
   },
   ///一竖中右半
   t : function(x,y,z,block,data,who){
      tickLineFillArray.push([x+7,y+1,z+7,x+7,y+4,z+13,block,data,who]);
   },
   ///二横右半
   u : function(x,y,z,block,data,who){
      tickLineFillArray.push([x+7,y+1,z+3,x+13,y+3,z+3,block,data,who]);
      tickLineFillArray.push([x+7,y+1,z+7,x+13,y+3,z+7,block,data,who]);
   },
   ///二竖右半
   v : function(x,y,z,block,data,who){
      tickLineFillArray.push([x+3,y+1,z+7,x+3,y+4,z+13,block,data,who]);
      tickLineFillArray.push([x+7,y+1,z+7,x+7,y+4,z+13,block,data,who]);
   },
   ///二横中右半
   w : function(x,y,z,block,data,who){
      tickLineFillArray.push([x+7,y+1,z+3,x+13,y+3,z+3,block,data,who]);
      tickLineFillArray.push([x+7,y+1,z+11,x+13,y+3,z+11,block,data,who]);
   },
   ///二竖中右半
   x : function(x,y,z,block,data,who){
      tickLineFillArray.push([x+3,y+1,z+7,x+3,y+4,z+13,block,data,who]);
      tickLineFillArray.push([x+11,y+1,z+7,x+11,y+4,z+13,block,data,who]);
   },
   ///三横右半
   y : function(x,y,z,block,data,who){
      tickLineFillArray.push([x+7,y+1,z+3,x+13,y+3,z+3,block,data,who]);
      tickLineFillArray.push([x+7,y+1,z+7,x+13,y+3,z+7,block,data,who]);
      tickLineFillArray.push([x+7,y+1,z+11,x+13,y+3,z+11,block,data,who]);
   },
   ///三竖右半
   z : function(x,y,z,block,data,who){
      tickLineFillArray.push([x+3,y+1,z+7,x+3,y+4,z+13,block,data,who]);
      tickLineFillArray.push([x+7,y+1,z+7,x+7,y+4,z+13,block,data,who]);
      tickLineFillArray.push([x+11,y+1,z+7,x+11,y+4,z+13,block,data,who]);
   },//欸嘿，正好
   xboy : function(x,y,z,block,data,who){
      //console.log(tickLineFillArray.length)
      tickLineSetblockArray.push([x+3, y+3, z+8, block, data, who])
      tickLineSetblockArray.push([x+3, y+2, z+8, block, data, who])

      tickLineSetblockArray.push([x+6, y+3, z+3, block, data, who])
      tickLineSetblockArray.push([x+6, y+2, z+3, block, data, who])

      tickLineSetblockArray.push([x+11, y+3, z+6, block, data, who])
      tickLineSetblockArray.push([x+11, y+2, z+6, block, data, who])

      tickLineSetblockArray.push([x+8, y+3, z+11, block, data, who])
      tickLineSetblockArray.push([x+8, y+2, z+11, block, data, who])

   }
   
}

export { tickLineCLEAR, chunk_fill_tool_xYzIDw, aisle_fill_tool_xyzIDwm, wall_fill_tool_xyzIDw, gate_fill_tool_xyzIDIDw, xboy_fill_tool_xyzIDw, setCountRest};










