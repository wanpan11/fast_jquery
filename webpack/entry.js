const path = require('path')  //path是node.js自带的路径工具
const fs = require("fs");

const jsHomePath = path.resolve(process.cwd(), "src/app/script")

const jsfilesName = fs.readdirSync(jsHomePath)
const entry = {}
for (let i = 0; i < jsfilesName.length; i++) {
    let key = jsfilesName[i].slice(0, jsfilesName[i].indexOf('.'))
    entry[key] = './script/' + jsfilesName[i]
    entry[key].toString()
}
console.log(entry);

module.exports.entry = entry
