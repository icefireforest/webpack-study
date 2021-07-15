const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
//指定css兼容性打包是使用开发模式还是生产模式 

process.env.NODE_ENV="development";
module.exports = {
    entry: './js/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                test: /\.css$/i,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options: {
                            postcssOptions:{
                                plugins:[
                                    [ require('postcss-preset-env')() ],
                                ]
                            }
                        }
                    }
                ]
            },
            /*
             * 语法检查  eslint-loader eslint 
               注意：只检查自己写的代码，不检查第三方库
               设置检查规则:
                 package.json中eslintConfig中设置
                 airbnb--> eslint-config-airbnb-base  eslint    eslint-plugin-import
             */
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options:{
                    //自动修复
                    fix: true
                }
                
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'css/built.css'
        }),
        new OptimizeCssAssetsWebpackPlugin()
    ],
    mode: 'development'
}