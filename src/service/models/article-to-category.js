'use strict';

const {Model} = require(`sequelize`);

class AtricleToCategory extends Model {

}

const define = (sequelize) => AtricleToCategory.init({}, {
  sequelize,
  modelName: `AtricleToCategory`,
  tableName: `articleToCategories`,
  timestamps: false,
  paranoid: false,
});


module.exports = define;
