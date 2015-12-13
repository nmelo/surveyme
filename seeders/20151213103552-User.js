'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

      return queryInterface.bulkInsert('User', [{
        username: 'admin',
        password: 'alongpasswordhere'
      }], {});

  },

  down: function (queryInterface, Sequelize) {

    return queryInterface.bulkDelete('User', null, {});

  }
};
