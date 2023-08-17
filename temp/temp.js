
// console.log("2BD50A27-AB5F-4F40-A596-3641627C635E".toLowerCase())




import { DFAFactory } from './scanner.js'

const factory = new DFAFactory()

const commentDfa = factory.build(`
START:
    / => COMM

COMM:
    / => SLC
    ** => MLC
    * => ERROR

SLC:
    \\n => ENDB
    * => SLC

MLC:
    ** => WLC
    * => MLC

WLC:
    / => END
    ** => WLC
    * => MLC
`)

const idDfa = factory.build(`
START:
    _ | a-z | A-Z => ID

ID:
    _ | 0-9 | a-z | A-Z => ID
    * => ENDB
`)

const str = `@e[type=pig,name=!"xboy\' minemc",m=1,c=3,rx=1,rxm=7,ty=8,rym=69,l=1,lm=4,tag="xboy xboy",scores={xbo=6..,mine=7..9},family=mob,r=6,rm=60,x=2,y=3,z=4,dx=1,dy=-1,dz=8]`

commentDfa.onFinish = (str, state) => {
    console.log(str, state);
    commentDfa.restore()
}

idDfa.onFinish = (str) => {
    console.log(str);
    idDfa.restore()
}


for (const ch of str.split('')) {
    commentDfa._recieveCharHandler(ch)
    idDfa._recieveCharHandler(ch)
}



const commentDfaa = `
START:：
    / => COMM

COMM:
    / => SLC
    ** => MLC
    * => ERROR

SLC:
    \\n => ENDB
    * => SLC

MLC:
    ** => WLC
    * => MLC

WLC:
    / => END
    ** => WLC
    * => MLC
`

var reg=/^([A-Z]+)[\s]*:：/m;

console.log(commentDfaa.match(reg))
// console.log("\n", String.fromCodePoint(parseInt("c")))