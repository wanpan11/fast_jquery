const path = require('path')  //path是node.js自带的路径工具
const entry = require('./entry');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve(process.cwd(), "src/app"),
    entry: entry.entry,
    output: {
        publicPath: "../",
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
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                }, 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                }, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.less/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                }, 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            limit: 64 * 1024,
                            outputPath: "img",
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // 类似 webpackOptions.output里面的配置 可以忽略
            filename: 'assets/[name].css',
            chunkFilename: '[id].css',
        }),
        new HtmlWebpackPlugin({
            title: '首页',
            template: path.resolve(process.cwd(), "src/app/view/index.html"),
            filename: "index.html",
            chunks: ["index"]
        }),
        new HtmlWebpackPlugin({
            title: 'demo',
            template: path.resolve(process.cwd(), "src/app/view/demo.html"),
            filename: "view/demo.html",
            chunks: ["demo"]
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        open: true
    }
}