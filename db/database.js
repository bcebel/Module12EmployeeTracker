const mysql = require("mysql2");

console.log(process.env.DB_PASSWORD);

const db = mysql.createConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: 3306,
  multipleStatements: true,
});

function connectToDatabase(callback) {
  db.connect(function (err) {
    if (err) throw err;
    console.log("Connected to database.");
    callback();
  });
}

module.exports = { db, connectToDatabase };
