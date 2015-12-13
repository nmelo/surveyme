/* /models/user.js */

// Require all the stuff
var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || "development";
var config    = require(__dirname + '/../config/config.json')[env];

// Setup sequelize db connection
var sequelize = new Sequelize(config.database, config.username, config.password, config);

// A helper to define the User model with username, password fields
var User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  password: Sequelize.STRING
});

User.sync();

module.exports = User;

