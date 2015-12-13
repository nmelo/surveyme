var express = require('express');
var router  = express.Router();

var db = require('../models');
var Choice = db.Choice;


router.post('/create', function(req, res) {
  var question_id = req.body.question_id;
  var text = req.body.text;

  //create a choice
  Choice
      .create({question_id: question_id, text: text})
      .then(function(choice) {
        res.redirect('/questions/' + question_id);
      });
});

module.exports = router;
