import '../css/a.css';
import '../css/b.css';
import print from './print';

const add = (x, y) => x + y;
// eslint-disable-next-line
console.log(add(2, 5));
// eslint-disable-next-line
console.log('js relaod');

print();
/**
 * hmr 热加载添加的代码
 */
if (module.hot) {
  module.hot.accept('./print.js', () => {
    // 监听print.js文件的变化
    print();
  });
}
