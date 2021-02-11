'use strict';

const {Router} = require(`express`);

const myRouter = new Router();
const api = require(`../api`).getAPI();


myRouter.get(`/`, async (req, res, next) => {
  try {
    const [
      pugArticles
    ] = await Promise.all([
      api.getArticles()
    ]);

    res.render(`my/my`, {pugArticles});
  } catch (err) {
    next(err);
  }
});

myRouter.get(`/comments`, async (req, res, next) => {
  try {
    const [
      pugComments
    ] = await Promise.all([
      api.getComments()
    ]);
    res.render(`my/comments`, {pugComments});
  } catch (err) {
    next(err);
  }

  const apiArticlesData = await api.getArticles();
  res.render(`my/comments`, {apiArticlesData: apiArticlesData.slice(0, 3)});
});

module.exports = {
  myRouter,
};
