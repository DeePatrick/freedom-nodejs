var express = require('express');
var router = express.Router();
var mysql = require('mysql');


// var router = function(){
//   authRouter.route('signUp')
//     .post(function(req, res){
//       console.log(req.body);
//   });
// }

/* GET accounts listing. */
router.get('/', function(req, res, next) {
  console.log(req.body);
  res.render('user', { title: 'My Accounts' });
});





//create connection
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'Password=123',
//   database : 'Mortgage'
// });

// var sql = 'SELECT * FROM Mortgage.Country';  
// connection.connect();

// connection.query( sql , function(err, rows, fields){
//   if(err) throw err;
// });
// connection.end();


//book array
var books =[
  {
    "title": "Learn C# faster",
    "author": "John McKain",
    "price": 30
  },
  {
    "title": "Game of trust",
    "author": "Mike Wiseman",
    "price": 40
  },
  {
    "title": "Godlizza - the return",
    "author": "John McKain",
    "price": 45.07
  }];


// to retrieve all memory blocks 
 
router.get('/dis',function ( req , res, next ) {     
  var quer1 = "SELECT * FROM Mortgage.Country";  
   connection.query(quer1, function(err, rows) {     
      if (err) {        
          console.log(err);                
      }           
      res.send(rows);
  });
  res.send(rows);
});



//book collection
router.get('/portfolio/books', function(req, res, next) {
  res.send(books);

  setTimeout(function () {
    server.close();
    // ^^^^^^^^^^^
}, 3000);
});


router.get('/portfolio/book/:id', function(req, res, next){
  var book = books[req.params.id]; // books[0]
  res.send(book);


  setTimeout(function () {
    server.close();
    // ^^^^^^^^^^^
}, 3000);
});


router.post('/portfolio/books', function(res, req, next){
  books.push(req.body);
  res.json(book);

  setTimeout(function () {
    server.close();
    // ^^^^^^^^^^^
}, 3000);
});

router.put('/portfolio/book/:id', function(res, req){
  var book = req.body;
  var bookToEdit = books[req.params.id];
  bookToEdit = book;
  //update logic
  books.push(bookToEdit);
  res.json(bookToEdit);

  setTimeout(function () {
    server.close();
    // ^^^^^^^^^^^
}, 3000);
});

router.delete('/portfolio/book/:id', function(req, res){
  books.splice(1, req.params.id);
  res.json(book);

  setTimeout(function () {
    server.close();
    // ^^^^^^^^^^^
  }, 3000);
});


/* GET mortgage page. */
router.get('/mortgage', function(req, res, next) {
  res.render('mortgage', { title : 'Mortgage Rates' });
});

/* GET mortgage commercial page. */
router.get('/mortgage/commercial-mortgage-application', function(req, res, next) {
  res.render('commercial-mortgage-application', { title : 'Mortgage Rates' });
});

/* GET mortgage joint page. */
router.get('/mortgage/joint-mortgage-application', function(req, res, next) {
  res.render('joint-mortgage-application', { title : 'Mortgage Rates' });
});


/* GET mortgage-accounts page. */
router.get('/mortgage-accounts', function(req, res, next) {
  res.render('mortgage-accounts', { title : 'Mortgage accounts' });
});

/* GET mortgage-application page. */
router.get('/mortgage-application', function(req, res, next) {
  res.render('mortgage-application', { title : 'Mortgage-application' });
});

/* GET outstanding-documents page. */
router.get('/outstanding-documents', function(req, res, next) {
  res.render('outstanding-documents', { title : 'Outstanding Documents' });
});

/* GET mortgage-rates page. */
router.get('/mortgage-rates', function(req, res, next) {
  res.render('mortgage-rates', { title : 'Mortgage Rates' });
});



module.exports = router;


