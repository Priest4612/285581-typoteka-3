'use strict';

const {Router} = require(`express`);

const {ARTICLES_PER_PAGE} = require(`../../constants`);

const {myRouter} = require(`./my-routes`);
const {articlesRouter} = require(`./articles-routes`);

const mainRouter = new Router();
const api = require(`../api`).getAPI();

const {getLogger} = require(`../../service/lib/logger`);
const logger = getLogger({name: `SEARCH-ROUTER`});

mainRouter.get(`/`, async (req, res, next) => {
  try {
    let {page = 1} = req.query;
    page = +page;
    const limit = ARTICLES_PER_PAGE;
    const offset = (page - 1) * ARTICLES_PER_PAGE;

    const [
      {count, articles},
      pugCategories,
      pugHotArticles,
      pugLastComments
    ] = await Promise.all([
      api.getArticles({limit, offset}),
      api.getCategories(),
      api.getArticles({limit: 4, offset: 0, hot: true}),
      api.getComments({limit: 4, offset: 0, last: true})
    ]);

    console.log(articles);

    const totalPages = Math.ceil(count / ARTICLES_PER_PAGE);

    res.render(`main/main`, {
      pugArticles: articles,
      pugCategories,
      pugHotArticles,
      pugLastComments,
      page,
      totalPages
    });
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
