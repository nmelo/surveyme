module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define('Question', {
    survey_id: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: true
      }
    },
    text: {
      type: DataTypes.STRING,
      validate: {
        notNull: false,
        len: [0, 1000]
      }
    }
  });

  return Question;
};

