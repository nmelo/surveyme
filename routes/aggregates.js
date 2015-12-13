var express = require('express');
var router  = express.Router();
var _ = require('lodash');

var db = require('../models');
var Aggregate  = db.Aggregate;

var colors = ["#F7464A", "#46BFBD", "#FDB45C"];
var highlights = ["#FF5A5E", "#5AD3D1", "#FFC870"];

router.get('/:survey_id', function(req, res) {
  var survey_id = req.params.survey_id;
  console.log(survey_id);

  //find aggregates for this survey
  Aggregate
      .findAll({where: {survey_id: survey_id}})
      .then(function(aggregates) {

        console.log(aggregates);
        var data = _.map(aggregates, function(agg, i) {
          return {
            value: agg.count,
            color: colors[i % 3],
            highlight: highlights[i % 3],
            label: agg.choice_id
          };
        });

        console.log(data);
        res.json(data);
      })
      .error(function(message){
        console.log(message);
      });
});

module.exports = router;
