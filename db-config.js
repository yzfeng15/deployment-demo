const mysql = require('mysql2');
require('dotenv').config();

// Create connection and connect to host
const conn = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER_ADMIN,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
});

module.exports = conn;
