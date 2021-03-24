'use strict';
const {Model} = require(`sequelize`);
const Alias = require(`../alias`);


module.exports = (sequelize, DataTypes) => {

  class Category extends Model {

    static associate(models) {
      Category.belongsToMany(models.Article, {through: models.ArticleToCategory, as: Alias.ARTICLES, foreignKey: `categoryId`});
      Category.hasMany(models.ArticleToCategory, {as: Alias.ARTICLE_TO_CATEGORIES, foreignKey: `categoryId`});
    }
  }

  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    sequelize,
    modelName: `Category`,
    tableName: `categories`,
    timestamps: false,
    paranoid: false,
  });

  return Category;
};
