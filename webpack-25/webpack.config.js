/**
 * pwa 渐进式网络开发应用程序(离线可访问)
 * workbox->workbox-webpack-plugin
 *  2.serviceworker的代码必须运行再服务器上
 *   -->node.js
 *    或者
 *   --> 
 *      npm i serve -g
 *      serve -s build //将build下的资源作为静态资源暴漏出去
 */

const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
module.exports = {
	entry: './src/js/index.js',
	output:{
		filename: 'js/[name].[contenthash:10].js',
		path: resolve(__dirname,'build'),
		environment: {
			arrowFunction: false,
			const: false
		}
	},
	module:{
		rules:[

		]
	},
	plugins:[
		//处理html文件
		new HtmlWebpackPlugin({
			template: './src/index.html',
			// 压缩html代码
			minify: {
				//删除空格
				collapseWhitespace: true,
				//删除注释
				removeComments: true
			}
		}),
		//PWA
		new WorkboxWebpackPlugin.GenerateSW({
			/**
			 * 帮助serviceworker快速启动
			 * 删除就的serviceworker
			 */
			clientsClaim: true,
			skipWaiting: true
		})
		
	],
	/**
	 * 1.可以将node_modules下面的模块单独打包成一个chunk输出
	 * 2.多入口如果有公共的依赖模块，依赖模块会提取成公共模块，只输出一次
	 *  */ 
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},
	/**
	 * 开发环境
	 *  */ 
	mode: 'production',

	
} 