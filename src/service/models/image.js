'use strict';

const {Model, DataTypes} = require(`sequelize`);


class Image extends Model {

}


const define = (sequelize) => Image.init({
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


module.exports = define;
