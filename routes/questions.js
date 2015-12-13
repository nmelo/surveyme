var express = require('express');
var router  = express.Router();

var db = require('../models');
var Question = db.Question;
var Choice = db.Choice;


router.post('/create', function(req, res) {
  if(!req.isAuthenticated()) res.redirect('/login');

  Question.create(req.body)
  .then(function(question) {
    res.redirect('/surveys/' + question.survey_id);
  });
});

router.get('/:question_id', function(req, res) {
  if(!req.isAuthenticated()) res.redirect('/login');
  console.log("rendering question");
  Question
    .findOne({
      where: {id: req.params.question_id}
    })
    .then(function(question) {
      if (question) {
        Choice
            .findAll({
              where: {question_id: req.params.question_id}
            })
            .then(function(choices) {
              res.render('question', { user: req.user, question_id: req.params.question_id, choices: choices, back_link: '/surveys/' + question.survey_id});
            });
      }
      else {
        res.status(400);
        res.json({'Message:':'Question not found'});
      }
    });
});

router.get('/:question_id/destroy', function(req, res) {
  if(!req.isAuthenticated()) res.redirect('/login');

  // get survey_id
  Question
      .findOne({
        where: {id: req.params.question_id}
      })
      .then(function(question) {
        if (question) {
          Question.destroy({
                where: {id: req.params.question_id}
              })
              .then(function() {
                res.redirect('/surveys/' + question.survey_id);
              });
        }
        else {
          res.status(400);
          res.json({'Message:':'Question not found'});
        }
      });
});

module.exports = router;
