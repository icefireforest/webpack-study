const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
	entry: './js/index.js',
	output:{
		filename: 'built.js',
		path: resolve(__dirname,'build'),
		environment: {
			arrowFunction: false,
			const: false
		}
	},
	module: {
		rules:[
			{
				test: /\.css$/i,
				use: [
					MiniCssExtractPlugin.loader, 
					"css-loader"
				],
			},
		]
	},
	plugins:[
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
		new MiniCssExtractPlugin({
            filename:'css/built.css'
        })
	],
	/**
	 * 自动压缩js文件
	 *  */ 
	mode: 'production'
	
} 