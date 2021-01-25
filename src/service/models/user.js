'use strict';

const {Model, DataTypes} = require(`sequelize`);


class User extends Model {

}


const define = (sequelize) => User.init({
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: `User`,
  tableName: `users`,
  timestamps: false,
  paranoid: false,
});


module.exports = define;
