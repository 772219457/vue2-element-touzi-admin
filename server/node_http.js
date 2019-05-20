const http = require('http');// 引入http核心模块
const fs = require('fs') // 引入文件操作 （核心）
const hostServer = http.createServer() // 创建一个服务
const moment = require('moment') // 引入时间格式模块（第三方）
const template = require('art-template') // 引入模版引擎
template.defaults.root = './'

hostServer.on('request', function (res, rep) { //绑定一个请求事件 res 请求， rep 相应的操作
    // console.log(res.method) 请求的方式，GET，POST。。。
    rep.setHeader('Content-type', 'text/html;charset=utf-8') //设置http头部，内容是纯文件(plian)，也可以使用html，使utf-8编码


    // fs.readFile('./index.html','utf-8',(err,data) => {
    //     rep.end(data)
    // }) // 响应整个html页面

    // rep.write('曹蓉是大傻逼')
    // rep.write('nihao') // 无setHeader中文有乱码
    // rep.end()  end()中有write操作

    /**
     * 根据请求的路径判断请求的资源
     * */
    const url = res.url

    if (url === '/') {
        // rep.setHeader('Content-type', 'text/html;charset=utf-8') //设置http头部，内容是纯文件(plian)，也可以使用html，使utf-8编码

        // fs.readFile('./index.html', 'utf-8', (err, data) => {
        //     rep.end(data)
        // }) // 响应整个html页面
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
                        rep.end(html)
                    }
                })
            }
        })

    } else if (url === '/file_list') {
        fs.readdir('./', 'utf8', async (err, data) => { // 读出当前文件夹的所有文件名
            let arrData = []
            for (let i = 0; i < data.length; i++) {
                await fs.stat(data[i], 'utf8', (err, files) => { // 根据文件名获取文件的属性
                    arrData[i] = {}
                    arrData[i].name = data[i]
                    arrData[i].size = files.size
                    arrData[i].type = files.isFile() // 判断是不是一个文件，不是则为文件夹
                    if (i + 1 === data.length) {
                        rep.end(JSON.stringify(arrData))
                    }
                })
            }
        })
    } else {
        // 响应一切html需要的资源
        fs.readFile(`..${url}`, (err, data) => {
            rep.end(data)
        })
    }

})

hostServer.listen(6060, function () { //启动监听
    console.log('请访问：127.0.0.1:6060')
})
