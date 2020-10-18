const path = require('path')  //path是node.js自带的路径工具
module.exports = {
      entry: {
        index: "./src/app/index.js"
    },
      output: {
          path: path.resolve(process.cwd(), "dist"),  //path.resolve(process.cwd()，) 指当前node启动目录
          filename: "[name].js"     //输出文件name
    },
module: {
        rules: [
            {
                test: /\.jsx?$/,        //相应的文件
                loader: 'babel-loader'     //处理的插件
            },
            {
                test: /\.css$/,
                loader: 'css-loader'
            },
            {
                test: /\.scss$/,
                loader: 'sass-loader'
            },
            {
                test: /\.less/,
                loader: 'less-loader'
            },
            {
                test: /\.(.png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg|swf)$/,
                loader: "file-loader"
            }
        ]
    },
}