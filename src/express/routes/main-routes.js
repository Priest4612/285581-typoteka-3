'use strict';

const {Router} = require(`express`);

const {myRouter} = require(`./my-routes`);
const {articlesRouter} = require(`./articles-routes`);

const mainRouter = new Router();
const api = require(`../api`).getAPI();

const {getLogger} = require(`../../service/lib/logger`);
const logger = getLogger({name: `SEARCH-ROUTER`});

mainRouter.get(`/`, async (req, res, next) => {
  try {
    const [
      pugArticles,
      pugCategories,
      pugHotArticles,
      pugLastComments
    ] = await Promise.all([
      api.getArticles(),
      api.getCategories(),
      api.getArticles({limit: 4, offset: 1, hot: true}),
      api.getComments({limit: 4, offset: 1, last: true})
    ]);

    res.render(`main/main`, {pugArticles, pugCategories, pugHotArticles, pugLastComments});
  } catch (err) {
    next(err);
  }
});

mainRouter.get(`/register`, (req, res) => res.render(`main/sign-up`));

mainRouter.get(`/login`, (req, res) => res.render(`main/login`));

mainRouter.get(`/search`, async (req, res) => {
  const {search} = req.query;
  try {
    const pugResults = await api.search(search);
    res.render(`main/search`, {
      pugResults, search
    });
  } catch (error) {
    logger.error(error);
    res.render(`main/search`, {
      pugResults: [], search
    });
  }
});

mainRouter.get(`/categories`, async (req, res, next) => {
  try {
    const [pugCategories] = await Promise.all([api.getCategories()]);
    res.render(`main/admin-categories`, {pugCategories});
  } catch (err) {
    next(err);
  }
});


mainRouter.use(`/my`, myRouter);
mainRouter.use(`/articles`, articlesRouter);


module.exports = {
  mainRouter,
};
