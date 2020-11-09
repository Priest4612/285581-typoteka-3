'use strict';

const {Router} = require(`express`);

const articlesRouter = new Router();


articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles/all-categories`));
articlesRouter.get(`/add`, (req, res) => res.render(`articles/new-post`));
articlesRouter.get(`/edit/:id`, (req, res) => res.render(`articles/edit`));
articlesRouter.get(`/:id`, (req, res) => res.render(`articles/post`));


module.exports = {
  articlesRouter,
};
