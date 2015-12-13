'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Surveys', [
      {
        title:"Survey1",
        subtitle: "Subtitle",
        active: 1
      }
    ]).error(function(message){
      console.log(message);
    }).done(function(done){
      console.log(done);
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Surveys', null, {});
  }
};
