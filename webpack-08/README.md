==图片资源的支持==
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


=======本节介绍开发环境的搭建=========
1.将前几课的内容汇总
2.将资源文件分类js,images,css,media等，并将打包后的文件按照规划好的目录分类
