const path = require('path')  //path是node.js自带的路径工具
const entry = require('./entry');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    context: path.resolve(process.cwd(), "src/app"),
    entry: entry,
    watch: true,
    output: {
        path: path.resolve(process.cwd(), "dist"),  //path.resolve(process.cwd()，) 指当前node启动目录
        filename: "[name].js"     //输出文件name
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.less/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "file-loader",
                options: {
                    name: 'assets/[name]_[sha512:hash:base64:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin({
            title: '首页',
            template: path.resolve(
                process.cwd(),
                'src/base/webpack.template.html'),
            filename: 'index.html',
            chunks: ['index']  //sale.html引入的css和js文件资源
        })
    ],
    devServer: {
        contentBase: path.resolve(process.cwd(), "index.html"),
        compress: true,
        port: 9000
    }
}