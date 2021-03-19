'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../../../constants`);
const {
  articleExists,
  schemaValidator,
} = require(`../../middlewares`);
const {
  commentSchema,
  articleSchema,
} = require(`../../validation-schema`);

const articleRouter = (app, articleService, commentService) => {
  const route = new Router();

  app.use(`/articles`, route);

  route.get(`/`, async (req, res) => {
    const {limit, offset, hot} = req.query;
    let result;
    if (limit || offset) {
      result = await articleService.findPage({limit, offset, hot});
    } else {
      result = await articleService.findAll();
    }

    return res.status(HttpStatusCode.OK)
      .json(result);
  });

  route.get(`/category/:id`, async (req, res) => {
    const {id} = req.params;
    const {limit, offset} = req.query;
    let result;
    if (limit || offset) {
      result = await articleService.findByCategoryPage({id, limit, offset});
    } else {
      result = await articleService.findByCategoryAll({id});
    }
    return res.status(HttpStatusCode.OK)
      .json(result);
  });

  route.get(`/:articleId`, async (req, res) => {
    const {articleId} = req.params;
    const article = await articleService.findOne(articleId);

    if (!article) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    return res.status(HttpStatusCode.OK)
      .json(article);
  });

  route.post(`/`, schemaValidator(articleSchema), async (req, res) => {
    const article = await articleService.create(req.body);

    return res.status(HttpStatusCode.CREATED)
      .json(article);
  });

  route.put(`/:articleId`, schemaValidator(articleSchema), async (req, res) => {
    const {articleId} = req.query;

    const updateArticle = await articleService.update(articleId, req.body);

    if (!updateArticle) {
      return res.status(HttpStatusCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    return res.status(HttpStatusCode.OK)
      .send(updateArticle);
  });

  route.delete(`/:articleId`, async (req, res) => {
    const {articleId} = req.params;
    const article = await articleService.drop(articleId);

    if (!article) {
      return res.status(HttpStatusCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    return res.status(HttpStatusCode.OK)
      .json(article);
  });

  route.get(`/:articleId/comments`, articleExists(articleService), async (req, res) => {
    const {articleId} = req.params;
    const comments = await commentService.findAllToArticle(articleId);

    return res.status(HttpStatusCode.OK)
      .json(comments);
  });

  route.delete(`/:articleId/comments/:commentId`, articleExists(articleService), async (req, res) => {
    const {commentId} = req.params;
    const deletedComment = await commentService.drop(commentId);

    if (!deletedComment) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .send(`Not found with ${commentId}`);
    }

    return res.status(HttpStatusCode.OK)
      .json(deletedComment);
  });

  route.post(`/:articleId/comments`, [articleExists(articleService), schemaValidator(commentSchema)], async (req, res) => {
    const {articleId} = res.locals;
    const comment = await commentService.create(articleId, req.body);

    return res
      .status(HttpStatusCode.CREATED)
      .json(comment);
  });
};

module.exports = {
  articleRouter,
};
