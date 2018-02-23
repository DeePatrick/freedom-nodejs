//--connection for mysql
var mysql = require('mysql');

var db = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

// //Connect
db.connect(function(err){
  if(err){
    throw err;
  }
  console.log('MySql Connected from db.js...');
  //db.end();
});


module.exports = db;