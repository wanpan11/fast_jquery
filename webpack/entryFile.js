const path = require('path')    //path是node.js自带的路径工具
const fs = require("fs");       //fs是node.js自带的文件工具
const HtmlWebpackPlugin = require('html-webpack-plugin');

const jsHomePath = path.resolve(process.cwd(), "src/app/script")
const htmlHomePath = path.resolve(process.cwd(), "src/app/view")
const jsFilesName = fs.readdirSync(jsHomePath) //获取script 文件夹里的内容
const htmlFilesName = fs.readdirSync(htmlHomePath) //获取view 文件夹里的内容

/**
 * @cooper
 * @description 根据传入的文件名称返回HtmlWebpackPlugin所需配置对象
 * @param {String} | name
 * @returns {Object}
 */
function getHtmlConfig(name) {
    return {
        title: name,
        chunks: [name],
        template: `./app/view/${name}.html`,
        filename: `${name}.html`,
        favicon: './public/logo.png', //该配置会在html同级目录下多出一个logo.png文件
        hash: true,
        inject: 'body',
    };
}

/**
 * @cooper
 * @description 根据getEntry返回的入口配置对象分别创建HtmlWebpackPlugin
 * @param {Object} | entries
 * @returns {Array}
 */
function createHtmlWebpackPlugin(entries) {
    const pluginArr = [];
    for (const key in entries) {
        if (entries.hasOwnProperty(key)) {
            const configOptions = getHtmlConfig(key);
            pluginArr.push(new HtmlWebpackPlugin(configOptions));
        }
    }
    return pluginArr;
}

/**
 * 
 * @description 根据传入的文件数组，转换为对象{key:val}
 * @param {*} arr 文件数组
 * @param {*} type 文件类型
 */
function fileNameArr2objHandler(arr, type) {
    let entry = {}
    for (let i = 0; i < arr.length; i++) {

        const isFile = arr[i].indexOf('.') 

        if (isFile !== -1) {
            let key = arr[i].slice(0, arr[i].indexOf('.')) //获取文件名作为键名
            if (type === 'js') {
                entry[key] = './app/script/' + arr[i] //拼接路径
            } else {
                entry[key] = arr[i]
            }
            entry[key].toString()
        }
    }
    return entry;
}

const jsEntry = fileNameArr2objHandler(jsFilesName, 'js')
const htmlEntry = createHtmlWebpackPlugin(fileNameArr2objHandler(htmlFilesName, 'html'))

module.exports = { jsEntry, htmlEntry }
