
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//process.env.NODE_ENV="development";
module.exports = {
    entry: './js/index.js',
    output:{
        filename:'built.js',
        path: resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                test:/\.css$/i,
                use:[
                    // css兼容性处理:postcss->postcss-loader postcss-preset-env
                    // postcss-preset-env 帮postcss找到package.json找到browserslist里面的配置,通过配置加载指定的css兼容性样式 
                    // package.json中需要配置browserslist,来配置需要兼容的浏览器,如下
                    /**
                      "browserslist":{
                        // 开发环境-> 需要设置process.env.NODE_ENV="development"
                        "development":[
                        "last 1 chrome version",
                        "last 1 firefox version",
                        "last 1 safari version"
                        ],
                        "production":[
                        ">0.2%",
                        "not dead",
                        "not op_mini all"
                        ]
                      }
                     */
                    'css-loader',
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
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    mode: 'development'
}