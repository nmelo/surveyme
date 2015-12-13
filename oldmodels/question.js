/* /models/question.js */

var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || "development";
var config    = require(__dirname + '/../config/config.json')[env];

// Setup sequelize db connection
var sequelize = new Sequelize(config.database, config.username, config.password, config);

var Question = sequelize.define('Question', {
  survey_id: Sequelize.INTEGER,
  title: Sequelize.STRING
});

Question.sync();

module.exports = Question;

