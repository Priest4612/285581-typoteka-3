'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../../../constants`);

const route = new Router();

const categoryRouter = (app, categoryService) => {
  app.use(`/categories`, route);

  route.get(`/`, async (req, res) => {
    const {needCount} = req.query;

    const categories = await categoryService.findAll({needCount});

    return res.status(HttpStatusCode.OK)
      .json(categories);
  });
};


module.exports = {
  categoryRouter,
};
