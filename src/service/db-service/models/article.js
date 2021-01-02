'use strict';

const {Model, DataTypes} = require(`sequelize`);

module.exports = (sequelize) => {
  class Article extends Model {}
  Article.init({
    regdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descriprion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: false,
    paranoid: false,
  });

  return Article;
};
