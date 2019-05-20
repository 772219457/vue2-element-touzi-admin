const fs = require('fs')
const work = require('./work')
const url = require('url') // 引入字符串解析模块

module.exports = {
    server(hotServer) {
        hotServer.on('request', (request, results) => { // 绑定请求事件
            // results.setHeader('Content-type', 'text/html;charset=utf-8') 用了template 就不用这个
            let route = url.parse(request.url,true)
            if (request.method === 'GET') {
                if (route.pathname === '/') {
                    results.end(work.html)
                } else if (route.pathname === '/getone') {
                    work.getOne(route.query.id,(data)=>{
                        results.end(data)
                    })
                } else {
                    // 响应一切html需要的资源
                    fs.readFile(`..${request.url}`, (err, data) => {
                        results.end(data)
                    })
                }
            } else {
                results.end(request.method)
            }
        })
    }
}
