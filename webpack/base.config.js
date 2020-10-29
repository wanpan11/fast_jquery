const path = require('path')  //path是node.js自带的路径工具
const { jsEntry, htmlEntry } = require('./entryFile');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
console.log(jsEntry);
console.log(htmlEntry);
module.exports = {
    context: path.resolve(process.cwd(), "src"),
    entry: jsEntry,
    output: {
        path: path.resolve(process.cwd(), "dist"),
        filename: "js/[name].js"
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
            filename: 'css/[name].css',
            chunkFilename: '[id].css',
        }),
        ...htmlEntry,
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        open: true
    }
}