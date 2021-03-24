'use strict';
const {Model} = require(`sequelize`);
const Alias = require(`../alias`);

module.exports = (sequelize, DataTypes) => {

  class Comment extends Model {

    static associate(models) {
      Comment.belongsTo(models.User, {as: Alias.USERS, foreignKey: `userId`});
      Comment.belongsTo(models.Article, {as: Alias.ARTICLES, foreignKey: `articleId`});
    }
  }

  Comment.init({
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: `Comment`,
    tableName: `comments`,
    timestamps: true,
    paranoid: false,
  });

  return Comment;
};
