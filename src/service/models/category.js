'use strict';

const {Model, DataTypes} = require(`sequelize`);


class Category extends Model {

}


const define = (sequelize) => Category.init({
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


module.exports = define;
