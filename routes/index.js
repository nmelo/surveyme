var express = require('express');
var router = express.Router();
var passport = require('passport');
var uuid = require('node-uuid');
var _ = require('lodash');

var db = require('../models');
var User = db.User;
var Survey = db.Survey;
var Question = db.Question;


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

function chooseSequence(pollster){

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

      });

}

// select next question from randomized sequence stored in Session
function chooseNextQuestion(pollster) {

  return chooseSequence(pollster)
      .then(function(pollster){
        var next_question_id = pollster.sequence[pollster.answered];
        return Question
            .findOne({
              where: {
                id: next_question_id
              }
            })
            .then(function(question) {
              return question;
            });
      });
}

router.get('/', function(req, res, next) {

  var pollster = setPollsterId(req);

  console.log(pollster);

  chooseNextQuestion(pollster)
      .then(function(question) {
        if (question) {
          question.choices = JSON.parse(question.choices); // parse choices
        }
        res.render('index', {pollster_id: pollster.id, question: question});
      });
});


router.get('/login', function(req, res, next) {
  if(req.isAuthenticated()) res.redirect('/surveys');

  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/surveys',
  failureRedirect: '/login',
  failureFlash: true
}));


router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', function(req, res, next) {
  console.log("Selecting with: " + req.body.username);
  User.findOne({where: {username : req.body.username}})
      .then(function(user){
        if (user == null){
          User.create(req.body).then(function(user) {
              passport.authenticate('local')(req, res, function () {
                console.log("auth done, redirecting");
                res.redirect('/surveys');
              });
            });
        }
        else {
          console.log("user found, not doing anything: " + user);
          res.redirect('/signup');
        }
      });
});


router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
