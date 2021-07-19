/**
 * tree shaking 去除无用代码
 * 去掉无用的js和css代码等
 * 使用条件：1.必须使用es6模块
 *           2.使用生产环境
 * 如下规避过分的treeshaking:
 * 在package.json中配置sideEffects: false        -> 所有的代码都没有副作用
 *   问题：会把其他资源干掉如css文件, polyfill等
 *   解决：标记不需要treeshaking的资源, "sideEffects": ["*.css"] 
 */

const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
// treeshaking要求是生产环境
process.env.NODE_ENV="production";
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
		filename: 'built.[contenthash:10].js',
		path: resolve(__dirname,'build'),
		environment: {
			arrowFunction: false,
			const: false
		}
	},
	module: {

		rules:[
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
			{
				oneOf:[
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
							],
							//开启babel缓存
							//第二次构建时,会读取之前的缓存
							cacheDirectory: true
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
            filename:'css/built.[contenthash:10].css'
		}),
		// css压缩
		new OptimizeCssAssetsWebpackPlugin()
		
	],
	/**
	 * 开发环境
	 *  */ 
	mode: 'production',
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
	target: 'web',
	//source-map
	devtool: 'nosources-source-map'

	
} 