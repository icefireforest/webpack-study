console.log('index.js被加载了!');
import {mul} from './test';

 //PWA
 if('serviceWorker' in navigator) {
     window.addEventListener('load',()=>{
         navigator.
          serviceWorker.register('/service-worker.js')
          .then(()=>{
            console.log('serviceworker注册成功了~');
          })
          .catch(()=>{
              console.log('serviceworker注册失败了~');
          })
     })
 }


