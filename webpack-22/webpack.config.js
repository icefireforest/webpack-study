/**
 * code split
 * 1. 多入口,编译多个输出文件
 *      entry: {
 *        main: './src/js/index.js',
 *        print: './src/js/print.js'
 *      },
		output:{
			filename: 'js/[name].[contenthash:10].js',
			path: resolve(__dirname,'build'),
			environment: {
				arrowFunction: false,
				const: false
			}
		}
 */

const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
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