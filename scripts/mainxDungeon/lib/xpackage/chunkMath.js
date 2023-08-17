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
  x2D : function(xz){
        
      //#xz : number[x,z] 
      //返回一个两元素数组，为#1坐标
      //西北角¿
    return xz.map( i => {
               i = i.toFixed(0);
               //i = i<0 ? i>-16 ?  i - i%16 - 16 :  i - i%16 - 16 : i - i%16;
             i = i<0 ? ( i%16== -0 ? +i : i - i%16 - 16) : i - i%16;
             return i;
        })
       
  },
  
  x3D : function(xyz){
        
      //#xyz : number[x,y,z] 
      //返回一个三元素数组，为#1坐标，且为所在16x16x16小区块内的顶面的角
      //顶面西北角¿
    return xyz.map( i => {
               i = i.toFixed(0);
               i = i<0 ? ( i%16== -0 ? +i : i - i%16 - 16) : i - i%16;
             return i;
        })
       
  },
  
  x2D_Get_All : function(xz){
        
      //#xz : number[x,z] 
      //返回一个四元素二维数组，为#1-#4坐标，且为所在16x16x16小区块内的顶面的角
      //西北角¿
    return [  xz ,[ xz[0]+16, xz[1]],[ xz[0]+16, xz[1]+16],[ xz[0], xz[1]+16]];

        
       
  },
  
  x62D : function(xz){
        
      //#xz : number[x,z] 
      //返回一个两元素数组，为#1坐标
      //西北角¿
    return xz.map( i => {
               i = i.toFixed(0);
               i = i<0 ? ( i%96== -0 ? +i : i - i%96 - 96) : i - i%96;
               //边长 : 六区块
             return i;
        })
       
  },
  
  kyj : function (x,z,u,v){
       
       //你知道回字有四样写法吗？
       //借用孔乙己的名字命名
       //传入一个中心坐标，一个待测坐标
       //给出回形相对位置
       //#######
       //#     #
       //# ### #
       //# # # #
       //# @ # #
       //#   # #
       //##### #
       
       let xz = [x,z].map( i => { i = i.toFixed(0);i = i - i%16;if(i < 0){i = i + 1;};return i/16;});
       let uv = [u,v].map( i => { i = i.toFixed(0);i = i - i%16;if(i < 0){i = i + 1;};return i/16;});
       let mx = 256/8;
       let i,j,k;
       let tf = true;
       let nu = 0;
       for(k=0;k<mx;k++){
          for(i=0;i<=k;i++){
             for(j=0;j<=k;j++){
                if(0+xz===0+uv){ break;};
                if(tf){
                 //好消息，摆烂不写了
                  }else{
                 
                };
                nu++;
             }
          }
       }
    return 
  
  
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