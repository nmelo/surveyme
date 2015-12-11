var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var lodash    = require('lodash');
var passportLocalSequelize = require('passport-local-sequelize');

var sequelize = new Sequelize('surveys', 'root', null, {dialect: "mysql"});

var db = {};

fs.readdirSync(__dirname)
  .filter(function(file) {
    return ((file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) == '.js'))
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].options.hasOwnProperty('associate')) {
    db[modelName].options.associate(db)
  }
});

var User = passportLocalSequelize.defineUser(sequelize, {
  is_admin: Sequelize.INTEGER
});

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize,
  User: User
}, db);

User.create(
  { username: "admin", hash: "bolognese", salt: "1234", is_admin: 1}, { validate: true }).catch(function(errors) {
  console.log(errors);
});

User.sync();

passportLocalSequelize.attachToUser(User, {
  usernameField: 'admin2',
  hashField: 'myhash',
  saltField: 'mysalt'
});
