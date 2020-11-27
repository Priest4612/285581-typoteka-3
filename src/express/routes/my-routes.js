'use strict';

const {Router} = require(`express`);

const myRouter = new Router();
const api = require(`../api`).getAPI();


myRouter.get(`/`, async (req, res) => {
  const apiArticlesData = await api.getArticles();
  res.render(`my/my`, {apiArticlesData});
});

myRouter.get(`/comments`, async (req, res) => {
  const apiArticlesData = await api.getArticles();
  res.render(`my/comments`, {apiArticlesData: apiArticlesData.slice(0, 3)});
});

module.exports = {
  myRouter,
};
