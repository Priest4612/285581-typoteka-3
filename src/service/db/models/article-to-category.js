'use strict';
const {Model} = require(`sequelize`);

module.exports = (sequelize, _DataTypes) => {

  class ArticleToCategory extends Model {

    static associate(_models) {
      // define association here
    }
  }

  ArticleToCategory.init({}, {
    sequelize,
    modelName: `ArticleToCategory`,
    tableName: `articleToCategories`,
    timestamps: false,
    paranoid: false,
  });

  return ArticleToCategory;
};
