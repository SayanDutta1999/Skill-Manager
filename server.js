
// Application  configuration
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const pool = require('./Database/mysql_connection');
const app = require('./index');
const port = process.env.PORT;
// Checking connection of Mysql Connection
pool.getConnection((err)=>{
    if(err){
        console.log(err);
    }
    else {
        console.log('Database connection established');
    }
});

// Application listening on a specific port
app.listen(port);