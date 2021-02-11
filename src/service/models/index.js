'use strict';

const Alias = require(`./alias`);
const defineUserRole = require(`./user-role`);
const defineUser = require(`./user`);
const defineImage = require(`./image`);
const defineCategory = require(`./category`);
const defineArticle = require(`./article`);
const defineComment = require(`./comment`);
const defineArticleToCategry = require(`./article-to-category`);


const define = (sequelize) => {
  const UserRole = defineUserRole(sequelize);
  const User = defineUser(sequelize);
  const Image = defineImage(sequelize);
  const Category = defineCategory(sequelize);
  const Article = defineArticle(sequelize);
  const Comment = defineComment(sequelize);
  const ArticleToCategory = defineArticleToCategry(sequelize);


  // НАСТРОЙКА CВЯЗИ МЕЖДУ ТАБЛИЦАМИ
  // ***********************************
  // Модель User
  // ***********************************
  UserRole.hasMany(User, {as: Alias.USERS, foreignKey: `userRoleId`});
  User.belongsTo(UserRole, {as: Alias.USER_ROLES, foreignKey: `userRoleId`});

  // ***********************************
  // Модель Article
  // ***********************************
  User.hasMany(Article, {as: Alias.ARTICLES, foreignKey: `userId`});
  Article.belongsTo(User, {as: Alias.USERS, foreignKey: `userId`});


  // ***********************************
  // Модель Image
  // ***********************************
  Article.hasMany(Image, {as: Alias.IMAGES, foreignKey: `articleId`});
  Image.belongsTo(Article, {as: Alias.ARTICLES, foreignKey: `articleId`});


  // ***********************************
  // Модель Comment
  // ***********************************
  User.hasMany(Comment, {as: Alias.COMMENTS, foreignKey: `userId`});
  Comment.belongsTo(User, {as: Alias.USERS, foreignKey: `userId`});

  Article.hasMany(Comment, {as: Alias.COMMENTS, foreignKey: `articleId`});
  Comment.belongsTo(Article, {as: Alias.ARTICLES, foreignKey: `articleId`});


  // ***********************************
  // Модель Article_to_Catigories
  // ***********************************
  Article.belongsToMany(Category, {through: ArticleToCategory, as: Alias.CATEGORIES, foreignKey: `articleId`});
  Category.belongsToMany(Article, {through: ArticleToCategory, as: Alias.ARTICLES, foreignKey: `categoryId`});
  Category.hasMany(ArticleToCategory, {as: Alias.ARTICLE_TO_CATEGORIES, foreignKey: `categoryId`});

  return {UserRole, User, Article, Image, Comment, Category, ArticleToCategory};
};


module.exports = define;
