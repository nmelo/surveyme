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
              res.render('survey', { user: req.user, survey_id: req.params.survey_id, questions: questions, back_link: '/surveys'});
            });
      }
      else {
        res.status(400);
        res.json({'Message:':'Survey not found'});
      }
    });
});


router.get('/:survey_id/activate', function(req, res) {
  if(!req.isAuthenticated()) res.redirect('/login');

  //find the active survey
  Survey
      .findOne({
        where: {active: 1}
      })
      .then(function(active_survey) {
        //deactivate active survey
        return active_survey
            .update({
              active: 0
            })
            .then(function (survey) {
              return survey;
            });
      })
      .then(function(survey) {
        //// activate the selected survey
        Survey
            .findOne({
              where: {id: req.params.survey_id}
            })
            .then(function(inactive_survey) {
              return inactive_survey
                  .update({
                    active: 1
                  })
                  .then(function (survey) {
                    return survey;
                  });
            });
        //return survey;
      })
      .then(function(survey) {
        //render surveys
        res.redirect('/surveys');
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
