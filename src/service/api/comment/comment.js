'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../../../constants`);

const route = new Router();

const commentRouter = (app, commentService) => {
  app.use(`/comments`, route);

  route.get(`/`, async (req, res) => {
    const {limit, offset, last} = req.query;
    let result;

    if (limit || offset) {
      result = await commentService.findPage({limit, offset, last});
    } else {
      result = await commentService.findAll();
    }
    return res.status(HttpStatusCode.OK)
      .json(result);
  });
};


module.exports = {
  commentRouter
};
