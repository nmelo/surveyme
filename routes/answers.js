var express = require('express');
var router  = express.Router();

var db = require('../models');
var Question = db.Question;
var Answer  = db.Answer;


router.post('/create', function(req, res) {
  var question_id = req.body.question_id;
  var pollster_id = req.body.pollster_id;
  var choice = req.body.choice;

  //find question
  Question
      .find({where: {id: question_id}})
      .then(function(question) {

        var _answer = {
          question_id : question.id,
          pollster_id: pollster_id,
          choice: choice
        };

        Answer
            .create(_answer)
            .then(function(answer) {
              // advance to the next question
              req.session.pollster.answered = req.session.pollster.answered + 1;
              //redirect to the next question
              res.redirect('/');
            });
      });
});

module.exports = router;
