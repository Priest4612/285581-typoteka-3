'use strict';

const {Router} = require(`express`);

const {myRouter} = require(`./my-routes`);
const {articlesRouter} = require(`./articles-routes`);

const mainRouter = new Router();
const api = require(`../api`).getAPI();

const {getLogger} = require(`../../service/lib/logger`);
const logger = getLogger({name: `SEARCH-ROUTER`});

mainRouter.get(`/`, async (req, res) => {
  const [
    apiArticlesData,
    apiCategoriesData,
    apiHotArticlesData,
    apiLastComments
  ] = await Promise.all([
    api.getArticles(),
    api.getCategories(),
    api.getArticles({
      limit: 4,
      offset: 4,
      hot: true
    }),
    api.getComments({
      limit: 4,
      offset: 4,
      last: true
    })
  ]);

  res.render(`main/main`, {apiArticlesData, apiCategoriesData, apiHotArticlesData, apiLastComments});
});

mainRouter.get(`/register`, (req, res) => res.render(`main/sign-up`));

mainRouter.get(`/login`, (req, res) => res.render(`main/login`));

mainRouter.get(`/search`, async (req, res) => {
  const {search} = req.query;
  try {
    const results = await api.search(search);
    res.render(`main/search`, {
      results, search
    });
  } catch (error) {
    logger.error(error);
    res.render(`main/search`, {
      results: [], search
    });
  }
});

mainRouter.get(`/categories`, (req, res) => res.render(`main/articles-by-category`));

mainRouter.use(`/my`, myRouter);
mainRouter.use(`/articles`, articlesRouter);


module.exports = {
  mainRouter,
};
