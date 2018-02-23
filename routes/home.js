var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
var validator = require('express-validator');

//Authentication Packages
var session = require('express-session');
var passport = require('passport');



var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';






//--connection for mysql
var mysql = require('mysql');

var db = mysql.createConnection({
    host: 'freedom-mysql.clrvxv2cow30.us-east-1.rds.amazonaws.com',
    port: 3306,
    user: 'patrick',
    password: 'actionMAN123',
    database: 'Freedom'
});
//Connect
db.connect(function(err){
  if(err){
    throw err;
  }
  console.log('MySql Connected on home ...');
  //db.end();
});


/* GET portfolio page. */
router.get('/', function(req, res, next) {
    res.render('home', { title: 'Homepage' });
});

  module.exports = router;

   