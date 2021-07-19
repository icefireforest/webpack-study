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
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
	entry: {
		main: './src/js/index.js',
		print: './src/js/print.js'
	},
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
	 * 开发环境
	 *  */ 
	mode: 'development',

	
} 