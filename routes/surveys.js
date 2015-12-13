var express = require('express');
var router  = express.Router();

var db = require('../models');
var Survey  = db.Survey;
var Question = db.Question;

router.get('/', function(req, res) {
  if(!req.isAuthenticated()) res.redirect('/login');

  Survey.findAll()
    .then(function(surveys) {
      res.render('surveys', { title: 'Surveys', surveys: surveys, user: req.user });
    });
});

router.post('/create', function(req, res) {
  if(!req.isAuthenticated()) res.redirect('/login');

  Survey.create(req.body)
  .then(function(survey) {
    res.redirect('/surveys');
  });
});

router.get('/:survey_id', function(req, res) {
  if(!req.isAuthenticated()) res.redirect('/login');

  Survey
    .findOne({
      where: {id: req.params.survey_id}
    })
    .then(function(survey) {
      if (survey) {
        Question
            .findAll({
              where: {survey_id: req.params.survey_id}
            })
            .then(function(questions) {
              res.render('survey', { user: req.user, survey_id: req.params.survey_id, questions: questions});
            });
      }
      else {
        res.status(400);
        res.json({'Message:':'Survey not found'});
      }
    });
});

router.get('/:survey_id/destroy', function(req, res) {
  if(!req.isAuthenticated()) res.redirect('/login');

  Survey.destroy({
    where: {id: req.params.survey_id}
  })
  .then(function() {
      res.redirect('/surveys');
    });
});

module.exports = router;
