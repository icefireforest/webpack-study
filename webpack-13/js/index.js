//import '@babel/polyfill';

const add = (x, y) => {return x + y};
// eslint-disable-next-line
console.log(add(2, 5));

const promise = new  Promise((resolve)=>{
    setTimeout(()=>{
        console.log('100000000000');
        resolve();
    },1000)
})