/*
    开发环境的配置 
    webpack 将打包结果输出
    webpack serve --open 在内存中打包，不输出到文件
*/
const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
    entry:'./src/js/index.js',
    output:{
        filename: 'js/built.js',
        path:  resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                // 处理css资源
                test: /\.css$/i,
                use:['style-loader','css-loader']
            },
            {
                // 处理less资源
                test: /\.less$/i,
                use:['style-loader','css-loader','less-loader']
            },
            {
                // 处理图片资源，url-loader是基于file-loader的基础上做的
                //所以安装url-loader,一定要安装file-loader
                test: /\.(jpg|png|gif)$/i,
                loader: 'url-loader',
                options:{
                    limit: 8 * 1024,
                    // 关闭es6模块化，统一使用commonjs模块化,否则的化引用不到图片
                    esModule: false,
                    name:'[hash:10].[ext]',
                    //输出路径
                    outputPath:'images'
                }
            },
            {
                // 解决html页面中有img引用图片，编译后找不到图片的问题
                test:/\.html$/i,
                loader: 'html-loader',
                options:{
                    esModule: false
                }
            },
            {
                // 处理其他资源
                exclude:/\.(css|js|html|less|jpg|png|gif)$/i,
                loader:  'file-loader',
                options:{
                    name: '[hash:10].[ext]',
                    //输出路径
                    outputPath:'media'  
                }
            }

        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode:'development',
    devServer:{
        contentBase: resolve(__dirname,'build'),
        compress: true,
        port: 3000,
        open: true
    }
}