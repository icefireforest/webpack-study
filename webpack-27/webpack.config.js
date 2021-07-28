const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry:'./js/index.js',
    output:{
        filename: 'js/built.js',
        path: resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                test: /\.css$/i,
                use:[
                    //创建style标签，将样式放进去
                    //'style-loader',
                    //这个loader取代style-loader，提取js中的css到到单独文件
                    MiniCssExtractPlugin.loader,
                    //将css文件整合到js中
                    'css-loader'
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'css/built.css'
        })
    ],
    mode:'development',
    externals:{
        // 要忽略的库名及npm包名
        jquery: 'jQuery'
    }

}