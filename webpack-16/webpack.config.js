/**
 * hrm(hot module replacement) 热模块加载
 * 一个模块发生变化，只会重新打包这一个模块(而不是打包所有模块),极大提升构建速度
 *  样式文件: 可以使用hmr
 * js文件: js文件默认不能使用hmr
 *   解决: 添加js代码,添加支持hmr功能的代码,见index.js
 *        指挥针对非入口的js文件进行热加载
 * html文件: 默认不能使用hmr,html不能热更新(不用做hmr功能)
 *  解决: 修改entry入口,改为数组,将html文件也加入数组
 */

const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

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
	entry: ['./src/js/index.js', './src/index.html'],
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
	 * 开发环境
	 *  */ 
	mode: 'development',
    //开发服务器，devServer:用来自动化(自动编译，自动打开浏览器，自动刷新浏览器)
	devServer: {
		contentBase: resolve(__dirname,'build'),
		// 开启gzip压缩
		compress: true,
		// 服务端口号
		port: 3000,
		//自动打开浏览器
		open: true,
		// 开启hmr服务 
		hot: true
	},
	// 解决webpack devServer重新编译，但是浏览器不自动刷新的问题
	target: 'web'

	
} 