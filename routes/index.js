var express = require('express');
var router = express.Router();

var passport = require('passport');

var db = require('../models');
var questions = require('../controllers/questions');


/* GET home page. */
router.get('/', function(req, res, next) {

  db.Question.findAll().then(function(entities) {

    console.info(entities[0].text);

    res.render('index', {
        questions: entities
      }
    );
  });
});

router.get('/login', function(req, res) {
  db.User.sync();

    // Table created
  var user = db.User.create({
    username: 'admin',
    password: 'admin'
  });

  res.render('login', { user : req.user });
});

//router.post('/login',
//    passport.authenticate('local', { successRedirect: '/',
//      failureRedirect: '/login',
//      failureFlash: true })
//);

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

/* GET admin page. */
router.get('/admin', passport.authenticate('local', { session: false }), function(req, res, next) {
  res.render('admin', { user : req.user });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/ping', function(req, res){
  res.status(200).send("pong!");
});

module.exports = router;
