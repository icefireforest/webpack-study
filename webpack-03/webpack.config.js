/*
    webpack.config.js 是webpack的配置文件

    所有的构建工具都是基于node运行的，模块化默认采用的是commonjs
    注意:src下代码是基于ES6的代码, webpack的配置是基于commonjs的配置
*/
const  { resolve }  = require('path'); 
module.exports = {
    entry:'./src/index.js', //入口起点
    output: {
        filename: 'built.js',
        path: resolve(__dirname,'build') // 输出路径，所有资源打包都会输出到这个文件夹下
    },
    module: {
        rules: [
          {
            test: /\.css$/i,
             //使用哪些loader，use执行顺序是后面的先加载
            use: [
              //创建style标签，将js中的样式资源插入，添加到header中
              "style-loader", 
              //将css文件变成commonjs模块加载到js中,里面内容是样式字符串
              "css-loader"
            ]
          },
          {
            test: /\.less$/i,
             //使用哪些loader，use执行顺序是后面的先加载
            use: [
              //创建style标签，将js中的样式资源插入，添加到header中
              "style-loader", 
              //将css文件变成commonjs模块加载到js中,里面内容是样式字符串
              "css-loader",
              //将less变成css,需要下载less 和 less-loader
              "less-loader"
            ]
          }
         
        ],
      },
    plugins:[
    ],
    mode: 'development',
}