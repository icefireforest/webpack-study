
/**
 * loader: 1.下载 2.使用
 * plugins: 1.下载 2.引入 3.使用
 * npm i -D html-webpack-plugin
 */
const {resolve} = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    mode: 'development',
    entry:'./src/index.js',
    output:{
        filename: 'built.js',
        path: resolve(__dirname,'build')
    },
    module: {
        rules:[
            {
                test: /\.css$/i,
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
            }
        ]
    },
    plugins:[
        //默认创建一个空的html并引入打包后的js/css文件
        new HtmlWebpackPlugin({
            // 赋值模板文件，并自动引入打包后的js文件
            template:'./src/index.html'
        })
    ]
}