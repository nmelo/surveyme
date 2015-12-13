'use strict';
module.exports = function(sequelize, DataTypes) {
  var Choice = sequelize.define('Choice', {
    question_id: DataTypes.STRING,
    text: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Choice;
};