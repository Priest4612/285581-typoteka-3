'use strict';
const {Model} = require(`sequelize`);
const Alias = require(`../alias`);


module.exports = (sequelize, DataTypes) => {

  class Article extends Model {

    static associate(models) {
      Article.belongsTo(models.User, {as: Alias.USERS, foreignKey: `userId`});
      Article.hasMany(models.Image, {as: Alias.IMAGES, foreignKey: `articleId`});
      Article.hasMany(models.Comment, {as: Alias.COMMENTS, foreignKey: `articleId`});
      Article.belongsToMany(models.Category, {through: models.ArticleToCategory, as: Alias.CATEGORIES, foreignKey: `articleId`});
    }
  }

  Article.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    announce: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fullText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: `Article`,
    tableName: `articles`,
    timestamps: true,
    paranoid: true,
  });
  return Article;
};
