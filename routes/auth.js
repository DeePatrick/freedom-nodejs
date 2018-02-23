var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
var validator = require('express-validator');

//Authentication Packages
var session = require('express-session');
var passport = require('passport');
var MySQLStore = require('express-mysql-session')(session);

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
  console.log('MySql Connected on auth...');
  //db.end();
});


var sessionStore = new MySQLStore(db);
 

/* GET accounts listing. */
// router.get('/', function(req, res, next) {
//   console.log(req.body);
//   res.render('user', { title: 'user' });
// });

/* GET accounts listing. */
// router.post('/signUp', function(req, res, next) {
//   console.log(req.body);
//   req.login(req.body, function(){
//     res.redirect('/auth/profile');
//   });
// });

  /* GET profile. */
  // router.get('/profile', function(req, res) {
  //   console.log(req.body);
  //   res.json(req.user);
  // });
  

/*Get home page*/
router.get('/', function(req, res){
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.render('home', { title: 'Home' });
});



/*Get profile page*/
router.get('/profile', authenticationMiddleware() , function(req, res){
  res.render('profile', { title: 'Profile' });
});


router.get('/register', function(req, res, next) {
  console.log(req.body);
  res.render('register', { title: 'Registration' });
});


/*Get home page*/
router.get('/login', function(req, res){
  res.render('login', { title: 'login' });
});



/* GET accounts listing. */
router.post('/register', function(req, res, next) {

  req.checkBody('username', 'Username field cannot be empty.').notEmpty();
  req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
  req.checkBody('email', 'The email you entered is in valid, please try again.').isEmail();
  req.checkBody('email', 'Email address must be between 4-100 characters long. please try again.').len(4, 100);
  req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
  req.checkBody('password', 'Password must include one lowercase character, one uppercase character, a number, and a special character.').matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
  req.checkBody('reEnterPassword', 'Password must be between 8-100 characters long.').len(8, 100);
  req.checkBody('reEnterPassword', 'Password do not match, please try again.').equals(req.body.password);
  
  const errors = req.validationErrors();

  if(errors) {
    console.log(`errors: ${JSON.stringify(errors)}`);

    res.render('register', {
        title: 'Registration Error',
        //users: results,
        errors: errors
    });
  }
  else{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;


    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
      // Store hash in your password DB.
      db.query('INSERT INTO users (username,email, password) VALUES (?,?,?)' , [username, email, hash], 
      function(err, results, fields){
        if(err) throw err;
     
        db.query('SELECT LAST_INSERT_ID() as user_id', function(error, results, fields){
          
            if(error) throw error;

            const user_id = results[0];

            console.log(results[0]);
            req.login(user_id, function(err){
              res.redirect('/home');
            });
        });      
      });
    });

  }

});

passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
});

function authenticationMiddleware() {
  return function (req, res, next)  {
    console.log(`
        req.session.passport.user: ${JSON.
        stringify(req.session.passport)}`);

        if(req.isAuthenticated()) return next();
        res.redirect('/auth/login');
  };
}


module.exports = router;