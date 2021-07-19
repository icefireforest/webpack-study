==本节是oneOf性能提高=======

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



==生产环境的操作====

1. 将css代码从js中提取出来
2. 将js文件进行压缩
3. js的兼容性