const path = require('path')  //path是node.js自带的路径工具
const fs = require("fs");

const jsHomePath = path.resolve(process.cwd(), "src/app/script")

const jsFilesName = fs.readdirSync(jsHomePath)
const entry = {}
for (let i = 0; i < jsFilesName.length; i++) {
    let key = jsFilesName[i].slice(0, jsFilesName[i].indexOf('.'))
    entry[key] = './script/' + jsFilesName[i]
    entry[key].toString()
}
console.log(entry);

module.exports.entry = entry
