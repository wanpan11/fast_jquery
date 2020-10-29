const path = require('path')  //path是node.js自带的路径工具
const fs = require("fs");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const jsHomePath = path.resolve(process.cwd(), "src/app/script")
const htmlHomePath = path.resolve(process.cwd(), "src/app/view")
const jsFilesName = fs.readdirSync(jsHomePath)
const htmlFilesName = fs.readdirSync(htmlHomePath)

/**
 * 
 * @description 根据传入的文件数组，转换为对象
 * @param {*} arr 文件数组
 * @param {*} type 文件类型
 */
function fileNameArr2objHandler(arr, type) {
    let entry = {}
    for (let i = 0; i < arr.length; i++) {
        let key = arr[i].slice(0, arr[i].indexOf('.'))
        if (type === 'js') {
            entry[key] = './app/script/' + arr[i]
        } else {
            entry[key] = arr[i]
        }
        entry[key].toString()
    }
    return entry;
}

/**
 * @cooper
 * @description 根据传入的入口文件名称返回HtmlWebpackPlugin所需配置对象
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

const jsEntry = fileNameArr2objHandler(jsFilesName, 'js')
const htmlEntry = createHtmlWebpackPlugin(fileNameArr2objHandler(htmlFilesName, 'html'))

module.exports = { jsEntry, htmlEntry }
