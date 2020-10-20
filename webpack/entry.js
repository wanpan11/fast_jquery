const path = require('path')  //path是node.js自带的路径工具
const fs = require("fs");

const jsPath = path.resolve(process.cwd(), "src/app/script")

const jsfilesName = fs.readdirSync(jsPath)
const jsfilesNameObj = {}
for (let i = 0; i < jsfilesName.length; i++) {
    let key = jsfilesName[i].slice(0, jsfilesName[i].indexOf('.'))
    jsfilesNameObj[key] = '.\\script\\' + jsfilesName[i]
}
console.log(jsfilesNameObj);
module.exports = {
    jsfilesNameObj: jsfilesNameObj
}
