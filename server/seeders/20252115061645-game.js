'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const game = require('../db/games.json')
    game.forEach((el)=>{
      delete el.id
      el.createdAt = el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Games',game,{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Games', null, {});
  }
};
