'use strict';
const {Model} = require(`sequelize`);
const Alias = require(`../alias`);


module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {

    static associate(models) {
      UserRole.hasMany(models.User, {as: Alias.USERS, foreignKey: `userRoleId`});
    }
  }

  UserRole.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    sequelize,
    modelName: `UserRole`,
    tableName: `userRoles`,
    timestamps: false,
    paranoid: false,
  });

  return UserRole;
};
