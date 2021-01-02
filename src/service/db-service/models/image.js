'use strict';

const {Model, DataTypes} = require(`sequelize`);

module.exports = (sequelize) => {
  class Image extends Model {}
  Image.init({
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: false,
    paranoid: false,
  });

  return Image;
};
