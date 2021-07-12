import data from "./data.json";
import "./index.css";
/**
 * index.js webpack入口起点文件
 * 1.运行指令
 * 开发环境  webpack ./src/index.js -o ./build --mode=development
   生产环境  webpack ./src/index.js -o ./build --mode=production
   结论：
    webpack 默认只认识js和json资源，其他资源不识别
    生产环境比开发环境多一个压缩代码资源
    将ES6模块编译成浏览器识别的模块
 */

function add (x,y){
    return x+y;
}



console.log(data);

console.log(add(1,2));