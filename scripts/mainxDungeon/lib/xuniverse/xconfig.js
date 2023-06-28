// import { world } from "@minecraft/server";


// const overworld = world.getDimension("overworld");
const nether = world.getDimension("nether");
const the_end = world.getDimension("the end");

// const orxyz = [-704,0,-160];//核心参数，地牢起始坐标
const orxyz = [-10704,0,-10160];//核心参数，地牢起始坐标
const where = the_end;      //核心参数，地牢所在维度



export { orxyz, where };