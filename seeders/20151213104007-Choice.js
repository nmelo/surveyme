'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Choices', [
      {
        question_id: 1,
        text: "Choice #1"
      }
    ]).error(function(message){
      console.log(message);
    }).done(function(done){
      console.log(done);
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Choices', null, {});
  }
};
