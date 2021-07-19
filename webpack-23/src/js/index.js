
function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5,6));

// 加入webpackChunkName配置,使导出的文件名固定,代码如下 
import(/* webpackChunkName: 'print' */'./print').then(
  ({mul,count})=>{
    console.log('res=>',mul(2,7));
  }
).catch(()=>{
  console.log('error');
});
