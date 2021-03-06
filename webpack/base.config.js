const path = require('path')  //path是node.js自带的路径工具
const webpack = require("webpack")
const { jsEntry, htmlEntry } = require('./entryFile');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    context: path.resolve(process.cwd(), "src"),
    entry: jsEntry,
    output: {
        publicPath: "../",//npm start 默认根目录就是dist
        path: path.resolve(process.cwd(), "dist"),
        filename: "js/[name].js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /[\\/]node_modules[\\/]/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader', 'sass-loader'],
            },
            {
                test: /\.less/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader', 'less-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            //图片大小小于8kb，就会被base64处理
                            //优点：减少请求数量（减轻服务器压力）
                            //缺点：图片体积会更大（文件请求速度更慢）
                            limit: 8 * 1024 * 1024,
                            //因为url-loader没人使用ES6模块化解析，二html-loader引入图片是CommonJs
                            //解析时会出问题：【object Module】
                            //解决这个问题就需要关闭url-loader的ES6模块化，使用CommonJs解析
                            esModule: false,
                            //打包后的图片的名字[hash:10]:取图片前十位的哈希值，[ext]：保存原先的扩展名
                            name: '[hash:10].[ext]',
                            outputPath: "img"
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                //处理HTML文件的img图片（负责引入img，从而能被url-loader进行处理）
                loader: 'html-loader'
            },
            {
                test: /\.mp3$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash].[ext]',
                            outputPath: 'music',
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({   //CSS文件分离
            // 类似 webpackOptions.output里面的配置 可以忽略
            filename: 'css/[name].css',//输出到 dist目录下 的位置 
            chunkFilename: '[id].css',
        }),
        ...htmlEntry,   //解构html对象数组
        new webpack.ProvidePlugin({    //引入jquery 可直接在项目里使用$ 无需import
            jQuery: "jquery",
            $: "jquery"
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        open: true
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },
}