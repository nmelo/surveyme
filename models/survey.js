'use strict';
module.exports = function(sequelize, DataTypes) {
  var Survey = sequelize.define('Survey', {
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Survey;
};