var express = require('express');
var router = express.Router();

var people = [{ name: 'Jeff', age:30 },{ name: 'Sarah', age:10 },{ name: 'Anthony', age:45 }];
var users = [
{id :1, first_name:'John', last_name:'Doe', email:'johndoe@email.com'},
{id :2,first_name:'Jill', last_name:'Jackson', email:'jilljackson@email.com'},
{id :3,first_name:'Bob', last_name:'Smith', email:'jbob.smith@email.com'}
];


   //mortgage collection
    router.get('/', function(req, res, next) {
        res.render('mortgages/mortgage-types', { title: 'Mortgage types' });
    });

    router.get('/jm-application', function(req, res, next) {
        res.render('jm-application', { title: 'Mortgage types' });
    });

    router.get('/jm-short', function(req, res, next) {
        res.render('jm-short', { title: 'Mortgage types' });
    });


    router.post('/mortgages/add', function(req, res, next) {
        console.log(req.body.first_name);
        res.render('mortgages/mortgage-add');
    });


    router.get('/rates', function(req, res, next) {
        res.render('mortgage-rates', { title: 'Mortgage types' });
    });
   
   
    // router.post('mortgages/add', function(req, res, next) {
    //     console.log('Form Submitted!');
    //     //res.render('jm-application', { title: 'Mortgage List' });
    // });

    //book collection
    router.get('/country', function(req, res, next) {
         res.send(country);
     });
  
module.exports = router;
