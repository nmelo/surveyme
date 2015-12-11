var express = require('express');
var router = express.Router();

var questions = require('../controllers/questions');
var db = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {

  db.Question.findAll().then(function(entities) {

    console.info(entities[0].text);

    res.render('index',
        {
          title: 'SurveyMe - The Best Survey Taking App',
          questions: entities
        }
    );
  });
});

module.exports = router;
