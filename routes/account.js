var express = require('express');
var router = express.Router();
// var mysql = require('mysql');
// const db = require('../db.js');

/* GET accounts listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Accounts' });
});


router.get('/accounts', function(req, res, next) {
  var people = [{ name: 'Jeff', age:30 },{ name: 'Sarah', age:10 },{ name: 'Anthony', age:45 }];
  var users = [
  {id :1, first_name:'John', last_name:'Doe', email:'johndoe@email.com'},
  {id :2,first_name:'Jill', last_name:'Jackson', email:'jilljackson@email.com'},
  {id :3,first_name:'Bob', last_name:'Smith', email:'jbob.smith@email.com'}
];
  res.render('index', {title: 'render app', users: users, people :people});
});



router.get('/accounts/mortgage', function(req, res, next) {
  res.render('accounts/mortgage-accounts', { title: 'My Accounts' });
});


module.exports = router;
