'use strict';
module.exports = function(sequelize, DataTypes) {
  var Choice = sequelize.define('Choice', {
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