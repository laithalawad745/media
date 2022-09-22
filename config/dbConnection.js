const mysql = require('mysql2')

const dbCon = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'media',
})

const db = (sql, array, func) =>{
    dbCon.getConnection((err, connect)=>{
        if(err){
            console.log(err)
            console.log('database err')
        } else {
            connect.query(sql, array, func)
            connect.release()
        }
        
    })
}


module.exports = db