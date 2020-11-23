'use strict';

const {Router} = require(`express`);

const articlesRouter = new Router();
const api = require(`../api`).getAPI();


articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles/all-categories`));

articlesRouter.get(`/add`, (req, res) => res.render(`articles/new-post`));

articlesRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [apiArticleData, apiCategoriesData] = await Promise.all([
    api.getArticle(id),
    api.getCategories()
  ]);
  res.render(`articles/edit`, {apiArticleData, apiCategoriesData});
});

articlesRouter.get(`/:id`, (req, res) => res.render(`articles/post`));


module.exports = {
  articlesRouter,
};
