'use strict';

const {Router} = require(`express`);

const {myRouter} = require(`./my-routes`);
const {articlesRouter} = require(`./articles-routes`);

const mainRouter = new Router();


mainRouter.get(`/`, (req, res) => res.render(`main/main`));
mainRouter.get(`/register`, (req, res) => res.render(`main/sign-up`));
mainRouter.get(`/login`, (req, res) => res.render(`main/login`));
mainRouter.get(`/search`, (req, res) => res.render(`main/search`));
mainRouter.get(`/categories`, (req, res) => res.render(`main/articles-by-category`));

mainRouter.use(`/my`, myRouter);
mainRouter.use(`/articles`, articlesRouter);


module.exports = {
  mainRouter,
};
