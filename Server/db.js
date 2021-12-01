// ===========================================================================
// IMPORTS
// ===========================================================================
require('dotenv').config()
const mysql = require('mysql');
 
// ===========================================================================
// DB CONNECTION SETUP
// ===========================================================================
let connection;
connection = mysql.createConnection({
    host: process.env.RDS_HOST,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASS,
    port: process.env.RDS_PORT,
    database: process.env.RDS_DB,
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting to database: ' + err.stack);
      return;
    }
    console.log('database connected as id ' + connection.threadId);
  });

// ===========================================================================
// EXPORTS
// ===========================================================================
module.exports = connection;