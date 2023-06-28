
function xboy(level){
	;let er = 0;
	;let u9v9 = [];
	;//	for(let i = 0;i<10;i++){u9v9.push([" "," "," "," "," "," "," "," "," "])};
	;for(let i = 0;i<10;i++){u9v9.push([" "," "," "," "," "," "," "," "," "])};
	;let xu9v9 = u9v9
	;
	;const debug = 1-true
	;let az = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
	;
	;let uysy = [20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2];
	;//let level = 5
	;
	;if(uysy.indexOf(level) == -1){level=5;console.error("搞毛呢？想这么玩得加钱！")}
	//;	if(level>5){level = 5};
	var bbb = function (){
		try{	
		
		var xroom = function(u,v,n){
			let s = 0;
			if(u9v9[v+1][u] === " " && Math.random() > 0.5){u9v9[v+1][u] = n;s++};
			if(u9v9[v-1][u] === " " && Math.random() > 0.5){u9v9[v-1][u] = n;s++};
			if(u9v9[v][u-1] === " " && Math.random() > 0.5){u9v9[v][u-1] = n;s++};
			if(u9v9[v][u+1] === " " && Math.random() > 0.5){u9v9[v][u+1] = n;s++};
			if(s==0 && Math.random() > 0.00 && u9v9[v+1][u] === " "      ){u9v9[v+1][u] =  n };
			if(s==4 && Math.random() > 0.76 && u9v9[v+1][u] !=  az[level]){u9v9[v+1][u] = " "};
		};
		
		var xend  = function (){for(let v = 0;v<9;v++){for(let u = 0;u<9;u++){if(u9v9[v][u] === 1){u9v9[v][u]="a";};};};}
		var xnext = function (){
			let n = 0;
			for(let v = 0;v<9;v++){
				for(let u = 0;u<9;u++){
			
			if(u9v9[v+0][u] ==  1  && Math.random() > 0.91){n++;u9v9[v][u]="★";v=114514;xend();break;;;;;;;;};
					
				};
			};
			if(n==0){xnext()}else{
				if(debug){for(let i = 0;i<9;i++){console.error(u9v9[i].join());}}
			};
		};
		
		
		
		var yysy = function (n){
			for(let v = 0;v<9;v++){
				for(let u = 0;u<9;u++){
						
						if(u9v9[v][u] === n){u9v9[v][u]=az[n];xroom(u,v,n-1)}
						
				}
			}
			if(n>2){yysy(n-1)}else{xnext()};
		};
		 
		 u9v9[4][4] = level;
				 yysy(level)
				
		//	console.error(0)
		}catch(err){er++;if(debug){console.error(err);u9v9=xu9v9;yysy(level)}}
			
	};
	bbb()
	
	;let u21v21 = [];
	;	for(let i = 0;i<21;i++){u21v21.push([" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "])};
	;	
	if(debug){for(let i = 0;i<21;i++){console.error(u21v21[i].join());}};
	for(let v = 0;v<10;v++){
	   for(let u = 0;u<10;u++){
		   
		   u21v21[(u+1)*2][(v+1)*2] = u9v9[u][v]
		   
		   }
	}
	
	if(debug){for(let i = 0;i<21;i++){console.error(u21v21[i].join());}};
	
	
	let uvwxyz = [
			  [-2,0,-1,0,"|"],
			  [0,-2,0,-1,"="]
			]
	
	try{
		for(let u = 2;u<19;u++){
		   for(let v = 2;v<19;v++){
				  if(u21v21[u][v] != " " && u21v21[u][v] != "|" && u21v21[u][v] != "="){
					 uvwxyz.forEach((l)=>{
						if(u21v21[u+l[0]][v+l[1]] != " " && u21v21[u+l[0]][v+l[1]] != "=" && u21v21[u+l[0]][v+l[1]] != "|"){u21v21[u+l[2]][v+l[3]] = l[4];};
						})
					  }
			   }
		}
	}catch(err){er++;if(debug){console.error(err);}}
	if(debug){for(let i = 0;i<21;i++){console.error(u21v21[i].join());}}
	
	
	if(er==0){return u21v21}else{return false};
	
	}
	
	/*	
	let l = xboy()
	for(let i = 0;i<21;i++){console.error(l[i].join());}
*/
	
	export default xboy;
	