'use strict';

const {Router} = require(`express`);

const articlesRouter = new Router();
const api = require(`../api`).getAPI();

const {getLogger} = require(`../../service/lib/logger`);
const logger = getLogger({name: `ARTICLES-ROUTER`});

articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles/all-categories`));

articlesRouter.get(`/add`, (req, res) => res.render(`articles/new-post`));

articlesRouter.get(`/edit/:id`, async (req, res) => {
  try {
    const {id} = req.params;
    const [apiArticleData, apiCategoriesData] = await Promise.all([
      api.getArticle(id),
      api.getCategories()
    ]);
    res.render(`articles/edit`, {apiArticleData, apiCategoriesData});
  } catch (error) {
    res.render(`errors/404`);
    logger.error(error);
  }
});

articlesRouter.get(`/:id`, (req, res) => res.render(`articles/post`));


module.exports = {
  articlesRouter,
};
