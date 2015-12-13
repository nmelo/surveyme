var express = require('express');
var router = express.Router();
var passport = require('passport');
var uuid = require('node-uuid');
var _ = require('lodash');
var bcrypt = require('bcrypt-nodejs');

var db = require('../models');
var User = db.User;
var Survey = db.Survey;
var Question = db.Question;
var Choice = db.Choice;


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// check if pollster id is set on session, if it's not, set it
function setPollsterId(req) {
  var pollster = req.session.pollster;
  if (pollster == null) {
    pollster = {
      id: uuid.v4(),
      sequence: [],
      answered: 0
    };
    req.session.pollster = pollster;
    console.log("Pollster id is null, setting to: " + req.session.pollster.id);
  }
  else {
    console.log("Pollster id: " + pollster.id);
  }
  return pollster;
}

function chooseRandomSequence(pollster){

  // find the active survey
  return Survey
      .findOne({
        where: {
          active: 1
        }
      })
      .then(function (survey) {
        if( pollster.sequence.length == 0 || !survey ) {
          // get all question ids on the active survey and save on the sequence
          return Question
              .findAll({
                attributes: ["id"],
                where: {
                  survey_id: survey.id
                }
              })
              .then(function (questions) {
                shuffle(questions);
                pollster.sequence = _.map(questions, function(q) { return q.id });
                return pollster;
              });
        }
        return pollster;
      }).error(function(error){
        console.log(error);
      });
}

// select next question from randomized sequence stored in Session
function chooseNextQuestion(pollster) {

  return chooseRandomSequence(pollster)
      .then(function(pollster){
        //find next question in the sequence
        var next_question_id = pollster.sequence[pollster.answered];
        return Question
            .findOne({
              where: {
                id: next_question_id
              }
            })
            .then(function(question) {
              return question;
            }).error(function(error){
              console.log(error);
            });
      }).error(function(error){
        console.log(error);
      });
}

router.get('/', function(req, res, next) {

  var pollster = setPollsterId(req);
  var question = null;

  console.log(pollster);

  chooseNextQuestion(pollster)
     .then(function(_question) {
        if (_question) {
           question = _question;
           Choice
              .findAll({
                where: {question_id: question.id}
              })
              .then(function(choices){
                res.render('index', {pollster_id: pollster.id, question: question, choices: choices});
              }).error(function(error){
                console.log(error);
              });
        }
        else {
          res.render('index', {pollster_id: pollster.id, question: null, choices: null});
        }
     }).error(function(error){
      console.log(error);
     });

});


router.get('/login', function(req, res, next) {
  if(req.isAuthenticated()) res.redirect('/surveys');

  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/surveys',
  failureRedirect: '/login',
  failureFlash: 'Invalid username or password.'
}));


// Disable sign up, leaving here in case it's ever needed. Secure it first!
//router.get('/signup', function(req, res, next) {
//  res.render('signup');
//});
//
//router.post('/signup', function(req, res, next) {
//
//  User.findOne({where: {username : req.body.username}})
//      .then(function(user){
//        if (user == null){
//          var username = req.body.username;
//          var password = req.body.password;
//
//          var salt = bcrypt.genSaltSync(10);
//          var hash = bcrypt.hashSync(password, salt);
//
//          var _user = {
//            username:username,
//            hash: hash,
//            salt: salt
//          };
//          console.log(_user);
//
//          User.create(_user).then(function(user) {
//              passport.authenticate('local')(req, res, function () {
//                console.log("auth done, redirecting");
//                res.redirect('/surveys');
//              });
//            });
//        }
//        else {
//          console.log("user found, not doing anything: " + user);
//          res.failureFlash("user exists");
//          res.redirect('/signup');
//        }
//      });
//});


router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
