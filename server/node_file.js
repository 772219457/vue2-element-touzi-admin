const fs = require('fs'); //引入文件操作模块
import fs from 'fs'

fs.readFile('../outdb/chinaTouziList.txt','utf8',(err,data) => { //读出数据
    if(err){
        console.log('有些问题')
    }
    else {
        data += '追加成功';
        fs.writeFile('../outdb/chinaTouziList.txt',data,(err) =>{ //写入数据
            if(!err){
                console.log('追加成功了')
            }
            else {
                console.log('追加失败')
            }
        })
    }
})

fs.readdir('./','utf8',(err,data) => { // 读出当前文件夹的文件名
    if(err){
        console.log('有些问题')
    }
    else {
        console.log(data) // data 是数组形式的
        fs.stat(data[0],'utf8',(err,data) => {
            console.log(data)
        })
    }
})
