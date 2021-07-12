/**
 * 打包图片资源
 loader: 下载 使用
 plugins: 下载 引入 使用过
 
*/
const {resolve} = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports={
	mode:'development',
	entry:'./src/index.js',
	output:{
		filename:'built.js',
		path: resolve(__dirname,'build')
	},
	module:{
		rules:[
			{
				test:/\.css$/i,
				use:[
					'style-loader',
					'css-loader'
				]
			},
			{
				test:/\.less$/i,
				use:[
					'style-loader',
					'css-loader',
					'less-loader'
				]
			},{
				//处理图片资源
				test:/\.(jpg|png|gif)/i,
				//如果只使用一个loader,可以用loader属性
				loader:'url-loader',
				options:{
					// 如果图片大小小于8kb,竟会使用base64处理 
					//base64的优点:减轻请求数量(减轻服务器压力)
					//base64缺点:转成base64后,文件会变大
					limit: 8*1024,
					// 问题 因为url-loader默认使用es6模块解析,而html-loader引入图片时commonjs
					//解决 关闭url-loader的es6模块化，使用commonjs解析
					// 参考url: https://blog.csdn.net/m0_46333501/article/details/115084175
					esModule: false,
					// 给图片进行重命名，
					//[hash:10]取图片的hash的前10位
					//[ext]去文件原来的扩展名
					name: '[hash:10].[ext]'
				}
			},{
				test: /\.html$/i,
				loader: 'html-loader',
				options:{
					esModule: false
				}
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:'./src/index.html'
		})
	]
}