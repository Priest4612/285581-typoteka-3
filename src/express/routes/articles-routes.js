'use strict';

const {Router} = require(`express`);

const articlesRouter = new Router();


articlesRouter.get(`/category/:id`, (req, res) => res.send(`${req.baseUrl}${req.route.path}`));
articlesRouter.get(`/add`, (req, res) => res.send(`${req.baseUrl}${req.route.path}`));
articlesRouter.get(`/edit/:id`, (req, res) => res.send(`${req.baseUrl}${req.route.path}`));
articlesRouter.get(`/:id`, (req, res) => res.send(`${req.baseUrl}${req.route.path}`));


module.exports = {
  articlesRouter,
};
