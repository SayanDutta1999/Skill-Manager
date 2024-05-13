const mysql = require('mysql2');

// create pool connection with MySQL
const pool = mysql.createPool({
    connectionLimit : 20,
    host : process.env.HOST,
    port : process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database : process.env.DB_NAME
})


module.exports = pool;