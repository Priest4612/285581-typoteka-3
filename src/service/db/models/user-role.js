'use strict';
const {Model} = require(`sequelize`);


module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {

    static associate(models) {
      // define association here
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
