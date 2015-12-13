'use strict';
var bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: function (queryInterface, Sequelize) {

      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync("admin123", salt);

      return queryInterface.bulkInsert('Users', [
        {
          username: 'admin',
          salt: salt,
          hash: hash,
          createdAt: Date.now(),
          updatedAt: Date.now()
        }
      ]).error(function(message){
        console.log(message);
      }).done(function(done){
        console.log(done);
      });
  },

  down: function (queryInterface, Sequelize) {

    return queryInterface.bulkDelete('Users', null, {});

  }
};
