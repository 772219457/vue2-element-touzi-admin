const http = require('http') // 服务器启动模块
const route = require('./route')

const server = http.createServer() //创建服务

route.server(server) // 绑定服务模块

server.listen(6060,()=> {
    console.log('请访问：127.0.0.1:6060')
})
