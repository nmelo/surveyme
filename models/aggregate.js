'use strict';
module.exports = function(sequelize, DataTypes) {
  var Aggregate = sequelize.define('Aggregate', {
    survey_id: DataTypes.INTEGER,
    question_id: DataTypes.INTEGER,
    choice_id: DataTypes.INTEGER,
    count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Aggregate;
};