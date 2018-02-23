var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Password=123',
    database : 'Mortgage'
});
connection.connect(function(err) {
    if (err) throw err;
    connection.query("SELECT * FROM Country", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });