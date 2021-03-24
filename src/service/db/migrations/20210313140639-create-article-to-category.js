'use strict';
module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.createTable(`articleToCategories`, {});
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable(`articleToCategories`);
  }
};
