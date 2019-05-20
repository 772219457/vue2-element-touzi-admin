const template = require('art-template')
const db = require('./db')

template.defaults.root = './'

// 回调函数获取数据
db.query('select * from user',(data)=>{
    module.exports.html = template('./index.html',{data:data})
})

module.exports.getOne = (id,callback) => {
    db.query(`select * from user where ${id}`,(data)=>{
        callback(data)
    })
}

