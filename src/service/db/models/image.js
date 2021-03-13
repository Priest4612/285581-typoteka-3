'use strict';
const {Model} = require(`sequelize`);

module.exports = (sequelize, DataTypes) => {

  class Image extends Model {

    static associate(models) {
      // define association here
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
