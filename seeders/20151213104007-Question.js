'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Questions', [
      {
        survey_id: 1,
        title: "Question #1"
      },
      {
        survey_id: 1,
        title: "Question #2"
      },
      {
        survey_id: 1,
        title: "Question #3"
      },
      {
        survey_id: 2,
        title: "Question #4"
      },
      {
        survey_id: 2,
        title: "Question #5"
      },
      {
        survey_id: 2,
        title: "Question #6"
      }

    ]).error(function(message){
      console.log(message);
    }).done(function(done){
      console.log(done);
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Questions', null, {});
  }
};
