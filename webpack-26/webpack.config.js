const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

/**
 * thread-loader
 * npm i thread-loader -D
 * 
 */
process.env.NODE_ENV="development";
// 复用loader
const commonCssLoader = [
	// 将css文件抽取成一个文件
	MiniCssExtractPlugin.loader, 
	"css-loader",
	// 在package.json中定义兼容性->browserslists
	{
		loader: 'postcss-loader',
		options:{
			postcssOptions:{
				plugins:[
					'postcss-preset-env'
				]
			}
		}
	}
];

module.exports = {
	entry: './src/js/index.js',
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
			// 图片
			{
				test:/\.(jpg|png|gif)/i,
				loader: 'url-loader',
				options:{
					limit: 8 * 1024,
					name: '[hash:10].[ext]',
					outputPath: 'imgs',
					esModule: false
				}
			},
			// 处理html的img图片标签
			{
				test: /\.html$/i,
				loader: 'html-loader'
			},
			{
				test: /\.css$/i,
				use: [
					...commonCssLoader
				],
			},
			{
				test: /\.less$/i,
				use: [
					...commonCssLoader,
					"less-loader"
				],
			},
			// js兼容性处理  babel-loader
			{
				test: /\.js$/i,
				exclude: /node_modules/,
				use:[
					// 多进程打包
					// 启动一个进程大概600ms
					//可以设置进程数
					{
						loader: 'thread-loader',
						options: {
							// 进程数量
							workers: 2
						}
					},
					{
						loader: 'babel-loader',
						options:{
							presets:[
							   [
								'@babel/preset-env',
								{
									useBuiltIns: 'usage',
									corejs:{
										version: '3'
									},
									targets:{
										chrome: '60',
										firefox: '50',
										ie:'9',
										safari: '10',
										edge: '17'
									}
								}
							   ]
							]
						}
					}
					
				],
				
			},
			// js语法检查,需要package.json中配置eslintConfig-> airbnb规则
			// enforce: 'pre' 不管loader的放置位置,都优先执行
			{
				test: /\.js$/i,
				exclude: /node_modules/,
				enforce: 'pre',
				loader: 'eslint-loader',
				options:{
					//自动修复eslint的检查问题 
					fix: true
				}
			},
			// 其他文件处理
			{
				exclude: /\.(js|css|less|html|jpg|png|gif)$/i,
				loader: 'file-loader',
				options:{
					outputPath: 'media'
				}
			}
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
		// css合并为一个文件
		new MiniCssExtractPlugin({
            filename:'css/built.css'
		}),
		// css压缩
		new OptimizeCssAssetsWebpackPlugin()
		
	],
	/**
	 * 自动压缩js文件
	 *  */ 
	mode: 'production'
	
} 