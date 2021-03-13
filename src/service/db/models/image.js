'use strict';
const {Model} = require(`sequelize`);
const Alias = require(`../alias`);


module.exports = (sequelize, DataTypes) => {

  class Image extends Model {

    static associate(models) {
      Image.belongsTo(models.Article, {as: Alias.ARTICLES, foreignKey: `articleId`});
    }
  }

  Image.init({
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: `Image`,
    tableName: `images`,
    timestamps: false,
    paranoid: false,
  });

  return Image;
};
