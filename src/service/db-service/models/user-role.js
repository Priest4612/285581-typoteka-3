'use strict';

const {Model, DataTypes} = require(`sequelize`);

module.exports = (sequelize) => {
  class UserRole extends Model {}
  UserRole.init({
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: false,
    paranoid: false,
  });

  return UserRole;
};
