'use strict';
const {Model} = require(`sequelize`);

module.exports = (sequelize, DataTypes) => {

  class Article extends Model {

    static associate(models) {
      // define association here
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
