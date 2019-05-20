const fs = require('fs')
const template = require('art-template')
template.defaults.root = './'

fs.readdir('./', 'utf8', async (err, data) => { // 读出当前文件夹的所有文件名
    let arrData = []
    for (let i = 0; i < data.length; i++) {
        await fs.stat(data[i], 'utf8', (err, files) => { // 根据文件名获取文件的属性
            arrData[i] = {}
            arrData[i].name = data[i]
            arrData[i].size = files.size
            arrData[i].type = files.isFile() // 判断是不是一个文件，不是则为文件夹
            if (i + 1 === data.length) {
                let html = template('./index.html',{data:arrData})
                module.exports.html = html
            }
        })
    }
})
