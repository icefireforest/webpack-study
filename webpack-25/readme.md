==PWA=serviceworker+cache 离线访问=======

webpack需要引入的包
npm i -D webpack webpack-cli 
css需要引入的包:
npm i -D style-loader css-loader
less需要引入的包
npm i -D less less-loader
html插件引用
npm i -D html-webpack-plugin
图片资源loader
npm i -D url-loader file-loader
图片使用img引入到html文件,直接打包后,图片的名字都变了，所以根本找不到该图片，需要用html-loader处理
npm i -D html-loader
==其他资源的支持==
使用file-loader,上面已经安装
==devServer 热加载======
一定要全局安装，否则启动报错
npm i -g webpack-dev-server 
========提取多个css文件到一个单独的的css文件===========
npm i -D mini-css-extract-plugin
==============css兼容性============================
npm i -D postcss-loader postcss-preset-env
=============压缩css==============
npm i -D optimize-css-assets-webpack-plugin
===============eslint===============
npm i -D eslint-loader eslint
==============eslint airbnb检查规则
npm i -D eslint-config-airbnb-base eslint-plugin-import
===========js兼容性处理========
npm i -D @babel/core babel-loader  @babel/preset-env
npm i -D @babel/polyfill
npm i -D core-js
===========js压缩==========
将mode改为production
============html压缩========
minify: {
				//删除空格
				collapseWhitespace: true,
				//删除注释
				removeComments: true
			}
 ============生产环境webpack配置========           
============性能优化========
# webpack性能优化
* 开发环境性能优化
* 生产环境性能优化
## 开发环境性能优化
* 优化webpack包构建速度 hmr(hot module replacement)
* 优化代码调试功能 sourceMap
## 生产环境性能优化
* 优化webpack打包速度
* 优化代码运行性能

=============source-map===============
devtool: 'nosources-source-map'

=============oneOf====================
如果不配置oneOf,每一个文件会将rules里面的规则都匹配一遍，
如果配置了oneOf, 匹配到一个就不再继续匹配

配置oneOf需要注意：
如果一类文件需要配置多个规则,则不能同时配置在oneOf中,否则就只会执行一个

================缓存==============
babel缓存(构建缓存):
  //开启babel缓存
  //第二次构建时,会读取之前的缓存
  cacheDirectory: true
资源文件缓存:
  //1.构建时, 输入文件带上hash值
     hash的问题：如果重新打包会导致所有的缓存文件失效(可能只改了一个文件)
  // 2.chunkhash: 如果打包来源于同一个trunk,那么hash值就一样 
     问题： js和css的hash值还是一样的,因为css在js中，它们属于同一个chunk
  // 3.contenthash 根据文件内容生成hash,不同文件hash一定不同(推荐)

===============tree shaking================

  tree shaking 去除无用代码
  去掉无用的js和css代码等
  使用条件：
    1.必须使用es6模块
    2.使用生产环境  mode: "production";
  如下规避过分的treeshaking:
  在package.json中配置sideEffects: false        -> 所有的代码都没有副作用
    问题：会把其他资源干掉如css文件, polyfill等
    解决：标记不需要treeshaking的资源, "sideEffects": ["*.css"] 

===========懒加载，预加载===================
 懒加载，需要用到时才加载，平时即使浏览器空闲也不会加载
预加载,会在使用之前提前加载, 查看f12的network会看到其实页面一刷新时，就会加载了test文件,这与懒加载不同
预加载的浏览器兼容性差

==生产环境的操作====

1. 将css代码从js中提取出来
2. 将js文件进行压缩
3. js的兼容性