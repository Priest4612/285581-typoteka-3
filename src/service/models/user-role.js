'use strict';

const {Model, DataTypes} = require(`sequelize`);


class UserRole extends Model {

}


const define = (sequelize) => UserRole.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: `UserRole`,
  tableName: `userRoles`,
  timestamps: false,
  paranoid: false,
});


module.exports = define;
