'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Questions', [
      {
        survey_id: 1,
        title: "Question #1"
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
