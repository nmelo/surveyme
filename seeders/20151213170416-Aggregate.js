'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    //return queryInterface.bulkInsert('Aggregates', [
    //  {
    //    title:"Survey #1",
    //    subtitle: "Subtitle - Survey #1",
    //    active: 1
    //  },
    //  {
    //    title:"Survey #2",
    //    subtitle: "Subtitle - Survey #2",
    //    active: 0
    //  }
    //]).error(function(message){
    //  console.log(message);
    //}).done(function(done){
    //  console.log(done);
    //});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Aggregates', null, {});
  }
};
