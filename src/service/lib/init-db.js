'use strict';

const defineModels = require(`../db/models`);
const Alias = require(`../db/alias`);

const initDB = async (sequelize, {data}) => {
  const {roles, users, categories, articles} = data;

  const {Category, Article, UserRole, User} = defineModels;

  const categoryModels = await Category.bulkCreate(
      categories.map((item) => ({name: item}))
  );

  const categoryIdByName = categoryModels.reduce((acc, next) => ({
    [next.name]: next.id,
    ...acc
  }), {});

  await Promise.all([
    await UserRole.bulkCreate(roles.map((item) => ({name: item}))),
    await User.bulkCreate(users),
    articles.map(async (article) => {
      const createdArticle = await Article.create(article, {include: [Alias.IMAGES, Alias.COMMENTS]});
      await createdArticle.addCategories(
          article.categories.map((name) => {
            const categoryId = categoryIdByName[name];
            return categoryId;
          })
      );
    })
  ]);
};


module.exports = {
  initDB,
};
