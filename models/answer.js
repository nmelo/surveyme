var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || "development";
var config    = require(__dirname + '/../config/config.json')[env];

// Setup sequelize db connection
var sequelize = new Sequelize(config.database, config.username, config.password, config);

var Answer = sequelize.define('Answer', {
  question_id: Sequelize.INTEGER,
  pollster_id: Sequelize.STRING,
  choice: Sequelize.STRING
});

Answer.sync();

module.exports = Answer;
