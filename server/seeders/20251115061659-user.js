'use strict';
const {hash} = require('../helpers/bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   const user = require('../db/users.json')
   user.forEach(el => {
    delete el.id
    el.password = (hash(el.password))
    el.createdAt = el.updatedAt = new Date()
   });
   await queryInterface.bulkInsert('Users',user,{})
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users', null, {});
  }
};
