const http = require('http');// 引入http核心模块
const route = require('./route')
const hostServer = http.createServer() // 创建一个服务

route.server(hostServer)

hostServer.listen(6060, function () { //启动监听
    console.log('请访问：127.0.0.1:6060')
})
