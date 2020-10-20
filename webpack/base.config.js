const path = require('path')  //path是node.js自带的路径工具
const entryObj = require('./entry');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve(process.cwd(), "src/app"),
    entry: entryObj.jsfilesNameObj,
    // watch: true,
    output: {
        publicPath: "/dist",   //加了一个publicPath，webpack-dev-server会去读取相应路径下面的文件，所以上面可以得到sale.js等文件
        path: path.resolve(process.cwd(), "dist"),
        filename: "[name].js"
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
            template: path.resolve(process.cwd(), 'src/app/view/index.html'),
            filename: 'index.html',
            chunks: ['index']  //sale.html引入的css和js文件资源
        })

    ],
    /**
     * devServer webpack-dev-server
     * contentBase 指定文件
     */
    devServer: {
        contentBase: path.resolve(process.cwd(), "dist"),
        compress: true,
        port: 9000,
        open: true,
    }
}