const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'zl.772219457',
    database: 'onepiece'
})

connection.connect();

// module.exports.sql = (sqlStr) => {
//     connection.query('select * from user', (error, results) => {
//         console.log(results)
//         return results
//     });
// }


module.exports.query = (sqlStr,callback) => {
    connection.query(sqlStr, (error, results) => {
        let data = results
        callback(data);
        // connection.end();
    })
}


// module.exports.getOne = (id,callback) => {
//     connection.query(`select * from user where id = ${id}`, (error, results) => {
//         callback(results);
//         // connection.end();
//     })
// }

