'use strict';

const {Router} = require(`express`);

const {myRouter} = require(`./my-routes`);
const {articlesRouter} = require(`./articles-routes`);

const mainRouter = new Router();


mainRouter.get(`/`, (req, res) => res.send(`${req.baseUrl}${req.route.path}`));
mainRouter.get(`/register`, (req, res) => res.send(`${req.baseUrl}${req.route.path}`));
mainRouter.get(`/login`, (req, res) => res.send(`${req.baseUrl}${req.route.path}`));
mainRouter.get(`/search`, (req, res) => res.send(`${req.baseUrl}${req.route.path}`));
mainRouter.get(`/categories`, (req, res) => res.send(`${req.baseUrl}${req.route.path}`));

mainRouter.use(`/my`, myRouter);
mainRouter.use(`/articles`, articlesRouter);


module.exports = {
  mainRouter,
};
