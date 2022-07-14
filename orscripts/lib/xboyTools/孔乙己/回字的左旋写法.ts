const xBoyDream : Map<number,Array<number>> = new Map();
const toNegative = (i:number) : number => i < 0 ?  i : -i;
const toPositive = (i:number) : number => i < 0 ? -i :  i;
// let  x : number = 0,y : number = 0;


const xy = [-1,3]
const pos2index = (xy : Array<number>) : number=>{

    let x : number = xy[0], y : number = xy[1];

    if (x === y && x <= 0) return (x*2 -1) ** 2 -1;

    let inner : number = 1+toNegative(toPositive(x) > toPositive(y) ? x : y);
    // console.log("inner=>",inner)
    let inBas : number = (inner*2 -1) ** 2;
    // console.log("inBas=>",inBas)

    if (x===inner-1) return 1+inBas+toPositive(-inner-y)      -1
    if (y===inner-1) return 1+inBas+toPositive( inner-x)  +    toPositive((inner-1)*2)-1
    if (x===-inner+1)return 1+inBas+toPositive( inner-y)  +  2*toPositive((inner-1)*2)-1
    if (y===-inner+1)return 1+inBas+toPositive(-inner-x)  +  3*toPositive((inner-1)*2)-1

}
export default pos2index;
console.log(pos2index([0,0]))