'use strict';
const {Model} = require(`sequelize`);
const Alias = require(`../alias`);


module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.belongsTo(models.UserRole, {as: Alias.USER_ROLES, foreignKey: `userRoleId`});
      User.hasMany(models.Article, {as: Alias.ARTICLES, foreignKey: `userId`});
      User.hasMany(models.Comment, {as: Alias.COMMENTS, foreignKey: `userId`});
    }
  }

  User.init({
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
  return User;
};
