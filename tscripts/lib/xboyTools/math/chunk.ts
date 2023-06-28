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
//用于获取传入坐标所在区块的#1点坐标
const Chunk_Boundary_Point = {
    x2D : function(xz : number[]) : number[]{
          
        //#xz : number[x,z] 
        //返回一个两元素数组，为#1坐标
        //西北角¿
      return xz.map( i => {
                 i = +i.toFixed(0);
                 //i = i<0 ? i>-16 ?  i - i%16 - 16 :  i - i%16 - 16 : i - i%16;
               i = i<0 ? ( i%16== -0 ? +i : i - i%16 - 16) : i - i%16;
               return i;
          })
         
    },
    
    x3D : function(xyz : number[]) : number[]{
          
        //#xyz : number[x,y,z] 
        //返回一个三元素数组，为#1坐标，且为所在16x16x16小区块内的顶面的角
        //顶面西北角¿
      return xyz.map( i => {
                 i = +i.toFixed(0);
                 i = i<0 ? ( i%16== -0 ? +i : i - i%16 - 16) : i - i%16;
               return i;
          })
         
    },
    
    x2D_Get_All : function(xz : number[]) : number[][]{
          
        //#xz : number[x,z] 
        //返回一个四元素二维数组，为#1-#4坐标，且为所在16x16x16小区块内的顶面的角
        //西北角¿
      return [  xz ,[ xz[0]+16, xz[1]],[ xz[0]+16, xz[1]+16],[ xz[0], xz[1]+16]];
  
          
         
    },
    
    x62D : function(xz : number[]) : number[]{
          
        //#xz : number[x,z] 
        //返回一个两元素数组，为#1坐标
        //西北角¿
      return xz.map( i => {
                 i = +i.toFixed(0);
                 i = i<0 ? ( i%96== -0 ? +i : i - i%96 - 96) : i - i%96;
                 //边长 : 六区块
               return i;
          })
         
    },
    
    x92D : function(xz : number[]) : number[]{
          
        //#xz : number[x,z] 
        //返回一个两元素数组，为#1坐标
        //西北角¿
      return xz.map( i => {
                 i = +i.toFixed(0);
                 i = i<0 ? ( i%144== -0 ? +i : i - i%144 - 144) : i - i%144;
                 //边长 : 九区块
               return i;
          })
         
    }
    
  }
    
  
  const Chunk_Identify = {
    //已经忘记哪里抄来的了,史莱姆区块校验基岩算法
    //很抱歉我只是一个cv工程师
    slimeChunk : function(x : number,z : number) : boolean{
      let chunkX = Math.floor(x / 16),
          chunkZ = Math.floor(z / 16);
  
                  let s = (chunkX * 0x1f1f1f1f ^ chunkZ) >>> 0;
                  let m = 1 + Math.imul((s ^ s >>> 30), 0x6c078965) >>> 0;
                  s = s & 0x80000000 | m & 0x7fffffff;
                  for (let i = 2; i < 398; i++)
                      m = i + Math.imul((m ^ m >>> 30), 0x6c078965) >>> 0;
                  m ^= (s >>> 1) ^ (s & 1 ? 0x9908b0df : 0x0);
                  m >>>= 0;
                  m ^= m >>> 11;
                  m ^= (m << 7 & 0x9d2c5680) >>> 0;
                  m ^= (m << 15 & 0xefc60000) >>> 0;
                  m ^= m >>> 18;
  
                  if (!((m >>> 0) % 10))
                      return true
                  else
                      return false
    }
  }
    export default Chunk_Boundary_Point;
    
    /*
    　　　　　　　　▃▆█▇▄▖
    　　     　▟◤▖　　　◥█▎
    　　　◢◤　   ▐　　　　▐▉
    　▗◤　　　▂　▗▖　　▕█▎
    　◤　▗▅▖◥▄　▀◣　　█▊
    ▐　▕▎◥▖◣◤　　　　◢██
    █◣　◥▅█▀　　　　▐██◤
    ▐█▙▂　　　　　　　◢██◤
    　◥██◣　　　　◢▄◤
    　　　▀██▅▇▀
    HuaixiAoxi,Choule
    */