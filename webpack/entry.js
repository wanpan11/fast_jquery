const path = require('path')  //path是node.js自带的路径工具
const fs = require("fs");

const jsPath = path.resolve(process.cwd(), "src/app/script")
const htmlPath = path.resolve(process.cwd(), "src/app/view")

const jsObj = fs.readdirSync(jsPath)
const htmlObj = fs.readdirSync(htmlPath)


module.exports = {
    jsObj: jsObj,
    htmlObj: htmlObj
}

