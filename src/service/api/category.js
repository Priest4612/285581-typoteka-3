'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../../constants`);

const route = new Router();

const categoryRouter = (app, categoryService) => {
  app.use(`/categories`, route);

  route.get(`/`, (req, res) => {
    const categories = categoryService.findAll();
    return res
      .status(HttpStatusCode.OK)
      .json(categories);
  });
};


module.exports = {
  categoryRouter,
};
