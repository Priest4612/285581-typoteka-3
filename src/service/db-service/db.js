'use strict';

const {getLogger} = require(`../lib/logger`);
const {sequelize} = require(`../lib/sequelize`);


// Объявление моделей
const Comment = require(`./models/comment`)(sequelize);
const Article = require(`./models/article`)(sequelize);
const Category = require(`./models/category`)(sequelize);
const Image = require(`./models/image`)(sequelize);
const UserRole = require(`./models/user-role`)(sequelize);
const User = require(`./models/user`)(sequelize);
const ArticleToCategory = require(`./models/article-to-categories`)(sequelize);


// НАСТРОЙКА CВЯЗИ МЕЖДУ ТАБЛИЦАМИ
// ***********************************
// Модель User
// ***********************************
UserRole.hasMany(User, {
  as: `Users_to_UserRoles`,
  foreignKey: `userRoleId`,
});

User.belongsTo(UserRole, {
  as: `userRole`,
  foreignKey: `userRoleId`,
});


// ***********************************
// Модель Article
// ***********************************
User.hasMany(Article, {
  as: `Articles_to_User`,
  foreignKey: `userId`,
});

Article.belongsTo(User, {
  as: `User`,
  foreignKey: `userId`,
});


// ***********************************
// Модель Image
// ***********************************
Article.hasMany(Image, {
  as: `Images_to_Article`,
  foreignKey: `articleId`,
});

Image.belongsTo(Article, {
  as: `Article`,
  foreignKey: `articleId`,
});


// ***********************************
// Модель Comment
// ***********************************
User.hasMany(Comment, {
  as: `Comments_to_User`,
  foreignKey: `userId`,
});

Comment.belongsTo(User, {
  as: `User`,
  foreignKey: `userId`,
});

Article.hasMany(Comment, {
  as: `Comments_to_Article`,
  foreignKey: `articleId`,
});

Comment.belongsTo(Article, {
  as: `Article`,
  foreignKey: `articleId`,
});


// ***********************************
// Модель Article_to_Catigories
// ***********************************
Article.hasMany(ArticleToCategory, {
  as: `ArticleToCategory`,
  foreignKey: `articleId`,
});

Category.hasMany(ArticleToCategory, {
  as: `ArticleToCategory`,
  foreignKey: `categoryId`,
});


// Синхронизация с базой данных
const initDb = async () => {
  const logger = getLogger({name: `DB-SYNC`});
  await sequelize.sync({force: true});
  logger.info(`Структура БД успешно создана.`);
};


module.exports = {
  db: {
    Comment,
    Article,
    Category,
    Image,
    UserRole,
    User,
    ArticleToCategory,
  },
  initDb,
  sequelize,
};
