const mysql = require("mysql");
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: "3010",
  database: process.env.DB_NAME
});

//console.log(connection);

connection.connect(err => {
  if (err) {
    return console.log("Error connecting to database ", err);
  }
  console.log("MySQL connection successful!");
});

module.exports = connection;
