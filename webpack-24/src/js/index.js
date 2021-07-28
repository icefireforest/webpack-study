console.log('index.js被加载了!');
import {mul} from './test';

 //懒加载
document.getElementById("abc123").onclick = function(){
    import("./test").then(({mul})=>{
        console.log(mul(3,4));
    })
  
}

//预加载,会在使用之前提前加载
// 查看f12的network会看到其实页面一刷新时，就会加载了test文件,这与懒加载不同
document.getElementById("abc123").onclick = function(){
    import(/* webpackChunkName: 'test.js',webpackPrefetch: true */"./test").then(({mul})=>{
        console.log(mul(3,4));
    })
  
}

