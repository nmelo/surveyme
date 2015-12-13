var express = require('express');
var router  = express.Router();

var db = require('../models');
var Question = db.Question;
var Answer  = db.Answer;
var Aggregate  = db.Aggregate;


router.post('/create', function(req, res) {
  var question_id = req.body.question_id;
  var pollster_id = req.body.pollster_id;
  var choice_id = req.body.choice;

  //find question
  Question
      .find({where: {id: question_id}})
      .then(function(question) {

        var _answer = {
          question_id : question.id,
          pollster_id: pollster_id,
          choice_id: choice_id
        };

        // Find the aggregate
        var counter = 1;
        Aggregate.findOne({
          where: {
            survey_id: question.survey_id,
            question_id: question.id,
            choice_id: choice_id
          }
        })
        .then(function(aggregate) {
          console.log(aggregate);
          //create if it doesn't exist
          if (aggregate == null) {

            return Aggregate
              .create({
                survey_id: Number(question.survey_id),
                question_id: Number(question.id),
                choice_id: Number(choice_id),
                count: Number(counter)
              })
              .then(function(aggregate){
                return aggregate;
              })
          }
          else {
            //increase counter if it exists
            counter = aggregate.count + 1;
            return aggregate.update({
              count: counter
            });
          }
        })
        .then(function(answer) {
          // finally, create the answer
          Answer
              .create(_answer)
              .then(function(answer) {
                // advance to the next question
                req.session.pollster.answered = req.session.pollster.answered + 1;
                //redirect to the next question
                res.redirect('/');
              });
        });
      })
      .error(function(message){
        console.log(message);
      });
});

module.exports = router;
