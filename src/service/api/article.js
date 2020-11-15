'use strict';

const {Router} = require(`express`);

const {HttpStatusCode} = require(`../../constants`);
const {articleValidator, articleExists, commentValidator} = require(`../middlewares/`);


const route = new Router();

const articleRouter = (app, articleService, commentService) => {
  app.use(`/articles`, route);

  route.get(`/`, (req, res) => {
    const articles = articleService.findAll();
    return res
      .status(HttpStatusCode.OK)
      .json(articles);
  });

  route.get(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = articleService.findOne(articleId);

    if (!article) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    return res
      .status(HttpStatusCode.OK)
      .json(article);
  });

  route.post(`/`, articleValidator, (req, res) => {
    const article = articleService.create(req.body);

    return res
      .status(HttpStatusCode.CREATED)
      .json(article);
  });

  route.put(`/:articleId`, articleValidator, (req, res) => {
    const {articleId} = req.params;
    const existArticle = articleService.findOne(articleId);

    if (!existArticle) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    const updateArticle = articleService.update(articleId, req.body);

    return res
      .status(HttpStatusCode.OK)
      .json(updateArticle);
  });

  route.delete(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = articleService.drop(articleId);

    if (!article) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    return res
      .status(HttpStatusCode.OK)
      .json(article);

  });

  route.get(`/:articleId/comments`, articleExists(articleService), (req, res) => {
    const {article} = res.locals;
    const comments = commentService.findAll(article);

    return res
      .status(HttpStatusCode.OK)
      .json(comments);
  });

  route.delete(`/:articleId/comments/:commentId`, articleExists(articleService), (req, res) => {
    const {article} = res.locals;
    const {commentId} = req.params;
    const deletedComment = commentService.drop(article, commentId);

    if (!deletedComment) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .send(`Not found with ${commentId}`);
    }

    return res
      .status(HttpStatusCode.OK)
      .json(deletedComment);
  });

  route.post(`/:articleId/comments`, [articleExists(articleService), commentValidator], (req, res) => {
    const {article} = res.locals;
    const comment = commentService.create(article, req.body);

    return res
      .status(HttpStatusCode.CREATED)
      .json(comment);
  });
};

module.exports = {
  articleRouter,
};
