/* /models/survey.js */

var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || "development";
var config    = require(__dirname + '/../config/config.json')[env];

// Setup sequelize db connection
var sequelize = new Sequelize(config.database, config.username, config.password, config);

var Survey = sequelize.define('Survey', {
  title: Sequelize.STRING,
  subtitle: Sequelize.STRING,
  active: Sequelize.BOOLEAN
});

Survey.sync();

module.exports = Survey;