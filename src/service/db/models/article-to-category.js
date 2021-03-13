'use strict';
const {Model} = require(`sequelize`);

module.exports = (sequelize, _DataTypes) => {

  class ArticleToCategory extends Model {

    static associate(models) {
      // define association here
    }
  }

  ArticleToCategory.init({}, {
    sequelize,
    modelName: `AtricleToCategory`,
    tableName: `articleToCategories`,
    timestamps: false,
    paranoid: false,
  });

  return ArticleToCategory;
};
