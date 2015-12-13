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


router.get('/:choice_id/destroy', function(req, res) {
  if(!req.isAuthenticated()) res.redirect('/login');

  // get choice_id
  Choice
      .findOne({
        where: {id: req.params.choice_id}
      })
      .then(function(choice) {
        if (choice) {
          Choice.destroy({
                where: {id: req.params.choice_id}
              })
              .then(function() {
                res.redirect('/questions/' + choice.question_id);
              });
        }
        else {
          res.status(400);
          res.json({'Message:':'Choice not found'});
        }
      });
});

module.exports = router;
