# 初始化项目,创建package.json文件 
## npm init
# 安装webpack核心依赖包
## npm i webpack webpack-cli -g
# 编写测试代码
## 使用微博pack打包,并使用node执行编译后的js文件
  ### 1.运行指令
    开发环境  webpack ./src/index.js -o ./build --mode=development
    生产环境  webpack ./src/index.js -o ./build --mode=production
  ### 2.运行
    node ./build/main.js


