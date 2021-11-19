require('dotenv').config()
const mysql = require('mysql');
 

let connection;
connection = mysql.createConnection({
    host: process.env.RDS_HOST,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASS,
    port: process.env.RDS_PORT,
    database: process.env.RDS_DB,
});

connection.connect();

module.exports = connection;