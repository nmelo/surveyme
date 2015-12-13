'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Choices', [
      {
        question_id: 1,
        text: "Choice #1"
      },
      {
        question_id: 1,
        text: "Choice #2"
      },
      {
        question_id: 1,
        text: "Choice #3"
      },
      {
        question_id: 2,
        text: "Choice #4"
      },
      {
        question_id: 2,
        text: "Choice #5"
      },
      {
        question_id: 2,
        text: "Choice #6"
      },
      {
        question_id: 3,
        text: "Choice #7"
      },
      {
        question_id: 3,
        text: "Choice #8"
      },
      {
        question_id: 3,
        text: "Choice #9"
      },
      {
        question_id: 4,
        text: "Choice #10"
      },
      {
        question_id: 4,
        text: "Choice #11"
      },
      {
        question_id: 5,
        text: "Choice #12"
      },
      {
        question_id: 5,
        text: "Choice #13"
      },
      {
        question_id: 6,
        text: "Choice #14"
      },
      {
        question_id: 6,
        text: "Choice #15"
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
