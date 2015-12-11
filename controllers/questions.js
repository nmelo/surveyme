var db = require('../models');

exports.load = function(req,res,id,next) {

  db.Question.find(id).then(function(err,question) {
    if(err) return next(err);
    if(!question) return res.send(404);
    req.question = question;
    next();
  });
};

exports.findAll = function(req, res, next) {
  db.Question.findAll().then(function(entities) {
    res.json(entities)
  })
};

exports.find = function(req, res) {
  res.json(req.question);
};

exports.create = function(req, res) {
  db.Question.create(req.body).complete(function(err,entity) {
    if(err) return next(err);
    res.statusCode = 201;
    res.json(entity)
  })
};

exports.update = function(req, res) {
  req.question.updateAttributes(req.body).complete(function(err,entity) {
    if(err) return next(err);
    res.json(entity)
  })
};

exports.destroy = function(req, res) {
  req.question.destroy().complete(function(err) {
    if(err) return next(err);
    res.end()
  })
};

