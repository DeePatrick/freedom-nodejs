var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var validator = require('express-validator');

//Authentication Packages
var session = require('express-session');
var passport = require('passport');
var MySQLStore = require('express-mysql-session')(session);


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
  console.log('MySql Connected on app...');
  //db.end();
});

var options = {
  host: 'freedom-mysql.clrvxv2cow30.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'patrick',
  password: 'actionMAN123',
  database: 'Freedom'
};

var sessionStore = new MySQLStore(options);

//const db = require('./db');//issues connecting


var account = require('./routes/account');
var auth= require('./routes/auth');
var users = require('./routes/users');
var mortgages = require('./routes/mortgages');
var home = require('./routes/home');


var app = express();


// //Only use to Create DB a new 
// app.get('/createdb', function( req, res) {
//   var sql = 'CREATE DATABASE Mortgage';
//   db.query(sql, function(err, result){
//     if(err) throw err;
//     console.log(result);
//     res.send('database created...');
//   });
// });



// //Only use code below to Create a table and include to database connection when added
app.get('/createformstable', function(req, res){
  var sql = `Create Table jm (
    id int primary key auto_increment, 
    first_name varchar(20),
    last_name varchar(20), 
    email varchar(180))`;
  db.query(sql, function(err, result){
    if(err) throw err;
    console.log(result);
    res.send('JmForms  table created...');
  });
});



// //Inserts form 1:
app.get('/addform1', function (req, res) {
  //var user =  {id :1, first_name:'John', last_name:'Doe', email:'johndoe@email.com'};
  var form =  {
    Id: 1,
    FirstName: "Jim",
    MiddleName: "Gregg",
    LastName: "Alfreada",
    PassportNo: "7065789689",
    PinNo: "4576",
    Nationality: 2,
    MaritalStatus: 1,
    Address: "250 Querdie Road",
    Town: "Dagenham",
    Postcode: "RM155LT",
    Street: "Westbrook Drive",
    Country: 2,
    TelephoneNo: "0208786789",
    MobileNo: "07979089640",
    Fax: "020867909",
    Email: "adrain@gmx.com",
    PresentResidence: "456 Grove Road, London, ER12ER",
    DurationOfOccupantion: "2017-01-11",
    TypeOfOwnership: 1,
    NatureOfEmployment: 1,
    PreviousEmployerNatureOfEmployment: 1            
              };
  var sql = 'INSERT INTO Jm SET ?';
  var query = db.query(sql, form , function(err, result){
    if(err) throw err;
    console.log(result);
    res.send('Form 1 added...');
  });
});



// //Inserts form 1:
app.get('/addform1', function (req, res) {
  var form =  {
    Id: 2,
    FirstName: "Troy",
    MiddleName: "Cool",
    LastName: "Alfreada",
    PassportNo: "7065789689",
    PinNo: "4576",
    Nationality: 2,
    MaritalStatus: 1,
    Address: "250 Querdie Road",
    Town: "Dagenham",
    Postcode: "RM155LT",
    Street: "Westbrook Drive",
    Country: 2,
    TelephoneNo: "0208786789",
    MobileNo: "07979089640",
    Fax: "020867909",
    Email: "adrain@gmx.com",
    PresentResidence: "456 Grove Road, London, ER12ER",
    DurationOfOccupantion: "2017-01-11",
    TypeOfOwnership: 1,
    NatureOfEmployment: 1,
    PreviousEmployerNatureOfEmployment: 1            
              };
  var sql = 'INSERT INTO jm SET ?';
  var query = db.query(sql, form , function(err, result){
    if(err) throw err;
    console.log(result);
    res.send('Form 2 added...');
  });
});



// //Get all Forms:
app.get('/getJmForms', function (req, res) {
  var sql = 'Select * From jm';
  var query = db.query(sql, function(err, result){
    if(err) throw err;
    console.log(result);
    res.send(JSON.stringify(result));
  });
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'ifeufe9dew74^$%^c3h89783rrfic5e',
  resave: false, 
  store: sessionStore,
  saveUninitialized: false,
  //cookie: { secure: true }
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(validator());

//*The step below is no longer required because it's now configure directly in .ebextensions/staticfiles.config
app.use(express.static(path.join(__dirname, 'public')));



// Global vars
app.use(function(req, res, next) {
  res.locals.errors = null;
  next();
});



app.use('/', account);

app.use('/users', users);
app.use('/auth', auth);
app.use('/mortgages', mortgages);
app.use('/home', home);

//render all forms
app.get('/form', function(req, res, next) {
  // find everything in mysql
  var sql = `SELECT 
  FirstName
  ,MiddleName
  ,LastName
  ,PassportNo
  ,PinNo
  , Name as Nationality
  , Status as Marital_Status
  ,Address
  ,Town
  ,Postcode
  ,Street
  , Name as Country 
  ,TelephoneNo
  ,MobileNo
  ,Fax
  ,Email
  ,PresentResidence
  ,DurationOfOccupantion
  ,Type as TypeOfOwnership
  ,Contract as Nature_of_Employment
  ,Contract as Previous_Employer_Nature_Of_Employment
  ,BasicSalary
  ,CommissionEarned
  ,HouseAllowance
  ,OtherPayOrIncome
  ,DetailsOfOtherPay
  ,AmountRequired
  ,InstallmentRepaymentPeriod
  ,Reason as PurposeOfLoan
  ,Contract as Nature_of_Employment
  , Name as Country 
FROM jm 
inner join country c
on c.Id = jm.Country
inner join martialstatus ms
on ms.Id = jm.MaritalStatus
inner join natureofemployment ne
on ne.Id = jm.NatureOfEmployment
  inner join purposeofloan pl
  on pl.Id = jm.PurposeOfLoan_id
  inner join typeofownership tp
  on tp.Id = jm.id;`;
  var query = db.query(sql, function(err, result){
      if(err) throw err;
      console.log(result);
      res.render('jm-application', {
        title: 'Customers', 
        forms: result
      });
  });  
});



//Select all users
app.get('/getallforms', function(req, res, next) {
  // find everything in mysql
var sql = `SELECT 
  FirstName
  ,MiddleName
  ,LastName
  ,PassportNo
  ,PinNo
  , Name as Nationality
  , Status as MaritalStatus
  ,Address
  ,Town
  ,Postcode
  ,Street
  , Name as Country 
  ,TelephoneNo
  ,MobileNo
  ,Fax
  ,Email
  ,PresentResidence
  ,DurationOfOccupantion
  ,Type as TypeOfOwnership
  ,Contract as NatureOfEmployment
  ,Contract as PreviousEmployerNatureOfEmployment
  ,BasicSalary
  ,CommissionEarned
  ,HouseAllowance
  ,OtherPayOrIncome
  ,DetailsOfOtherPay
  ,AmountRequired
  ,InstallmentRepaymentPeriod
  ,Reason as PurposeOfLoan
  ,Contract as Nature_of_Employment
  , Name as Country 
  FROM jm 
	LEFT JOIN country c
	on c.Id = jm.Country
	LEFT JOIN martialstatus ms
	on ms.Id = jm.MaritalStatus
	LEFT JOIN natureofemployment ne
	on ne.Id = jm.NatureOfEmployment
    LEFT JOIN purposeofloan pl
    on pl.Id = jm.PurposeOfLoan_id
    LEFT JOIN typeofownership tp
    on tp.Id = jm.TypeOfOwnership`;
  var query = db.query(sql, function(err, result){
      if(err) throw err;
      console.log(result);
      res.render('jm-list', {
        title: 'Customers', 
        forms: result
      });
  });  
});

//Select single users
app.get('/forms/getform/:id', function(req, res, next) {
  // find everything in mysql
  let sql = `Select * From JM WHERE id = ${req.params.id}`;
  let query = db.query(sql, function(err, result){
      if(err) throw err;
      console.log(result);
      res.render('jm-list', {
        title: 'Customers', 
        forms: result
      });
  });  
});


//Select single form
app.get('/forms/getform/:id', function(req, res, next) {
  // find everything in mysql
  let sql = `Select * From JM WHERE id = ${req.params.id}`;
  let query = db.query(sql, function(err, result){
      if(err) throw err;
      console.log(result);
      res.render('jm-list', {
        title: 'Customers', 
        forms: result
      });
  });  
});

// update a form
app.get('/forms/update/:id', function(req, res, next) {
  let firstname = 'Adrianna';
  // update a first_name user in mysql
  let sql = `UPDATE JM SET FirstName = '${firstname}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, function(err, result){
      if(err) throw err;
      console.log(result);
      res.redirect('/getallforms');
  });  
});

app.post('/forms/add', function(req, res){
  req.checkBody('FirstName','First Name is Required.').notEmpty();
  req.checkBody('MiddleName','Middle Name is Required.').notEmpty();
  req.checkBody('LastName','Last Name is Required').notEmpty();
  req.checkBody('Email','Enter a valid Email.').notEmpty();
  req.checkBody('PassportNo','Enter a valid passport no.').notEmpty();
  req.checkBody('PinNo','PinNo is Required').notEmpty();
  //req.checkBody('MaritalStatus','Marital Status is Required.').notEmpty();
  req.checkBody('Address','Enter a valid address.').notEmpty();
  req.checkBody('Town','Town is Required.').notEmpty();
  req.checkBody('Postcode','First Name is Required.').notEmpty();
  req.checkBody('Street','Street field is Required.').notEmpty();
  req.checkBody('TelephoneNo','Enter a valid Telephone Number.').notEmpty();
  req.checkBody('MobileNo','Enter a valid phone address.').notEmpty();
  req.checkBody('Fax','Enter a valid Fax Number.').notEmpty();
  //req.checkBody('PresentResidence','Present Residence is Required.').notEmpty();
  //req.checkBody('DurationOfOccupantion','Enter a valid occupation.').notEmpty();

  var errors = req.validationErrors();
  var forms = [];

    if(errors){
        res.render('jm-short', {
          title: 'Customers', 
          forms: forms,
          errors: errors
        });
    } else {
          var newForm = {
              FirstName: req.body.FirstName,
              MiddleName: req.body.MiddleName,
              LastName: req.body.LastName,
              PassportNo: req.body.PassportNo,
              PinNo: req.body.PinNo,
              Nationality: req.body.Nationality,
              MaritalStatus: req.body.MaritalStatus,
              Address: req.body.Address,
              Town: req.body.Town,
              Postcode: req.body.Postcode,
              Street: req.body.Street,
              Country: req.body.Country,
              TelephoneNo: req.body.TelephoneNo,
              MobileNo: req.body.MobileNo,
              Fax: req.body.Fax,
              Email: req.body.Email,
              PresentResidence: req.body.PresentResidence,
              DurationOfOccupantion: req.body.DurationOfOccupantion,
              TypeOfOwnership: req.body.TypeOfOwnership,
              NatureOfEmployment: req.body.NatureOfEmployment,
              PreviousEmployerNatureOfEmployment: req.body.PreviousEmployerNatureOfEmployment 
          };
          
    // insert into mysql db
    var sql = 'INSERT INTO JM SET ?';
    var query = db.query(sql, newForm, function(err, result){
        if(err){
          console.log(err);
        }
        else{
          res.redirect('/form');
        }
    });
  }
});


//Delete a Form
app.get('/forms/delete/:id', function(req, res, next) {
  // update a first_name user in mysql
  let sql = `DELETE FROM JM WHERE id = ${req.params.id}`;
  let query = db.query(sql, function(err, result){
      if(err) throw err;
      console.log(result);
      res.redirect('/');
  });  
});



app.get('/forms/findall' , function ( req ,  res) {
    db.query("CALL sp_groupedTable()", function (err, rows) {
        res.end(JSON.stringify(rows));
    });
});


//Select a form detail
app.get('/forms/details/:id', function(req, res, next) {
  // find everything in mysql
  let sql = `Select * From JM WHERE id = ${req.params.id}`;
  let query = db.query(sql, function(err, result){
      if(err) throw err;
      console.log(result);
      res.render('jm-details', {
        title: 'Customers', 
        forms: result
      });
  });  
});


//Select a transaction summary//
app.get('/forms/transaction/:id', function(req, res, next) {
  // find everything in mysql
  let sql = `Select * From mortgage_details WHERE id = ${req.params.id}`;
  let query = db.query(sql, function(err, result){
      if(err) throw err;
      console.log(result);
      res.render('transaction-sm', {
        title: 'Customers', 
        forms: result
      });
  });  
});


app.get('/getalltransactions', function(req, res, next) {
  // find everything in mysql
  var sql = `SELECT * From mortgage_details`;
  var query = db.query(sql, function(err, result){
      if(err) throw err;
      console.log(result);
      res.render('transaction-sm', {
        title: 'Customers', 
        forms: result
      });
  });  
});


//Make our db accessible to our router
app.use(function(req, res, next){
  req.db = db;
  next();

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
