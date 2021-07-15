const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//指定css兼容性打包是使用开发模式还是生产模式 

process.env.NODE_ENV="development";
module.exports = {
    entry: './js/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname,'build'),
        environment: {
            arrowFunction: false 
        }
    },
    module:{
        rules:[
            {
                /* js兼容性处理 @babel/core babel-loader  @babel/preset-env 
                  1.一般兼容性处理,只能转换基本语法，Promise是无法转换的
                  2.全部兼容性处理，再1基础上加入@babel/polyfill
                    解决部分兼容性问题，但是引入的文件太大
                  3. (推荐)按需加载指定的兼容性的库 -->core-js, 以下代码是基于1,3两个方式的综合实现  
                */
                test: /\.js$/i,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options:{
                    presets:[
                        [
                            '@babel/preset-env',
                            {
                                // 按需加载
                                useBuiltIns:'usage',
                                // 指定core-js版本
                                corejs: '3',
                                // 指定兼容的浏览器
                                targets:{
                                    chrome: '60',
                                    firefox: '50',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'

                                }
                            }
                        ]
                        
                    ]
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
}