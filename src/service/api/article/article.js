'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../../../constants`);
const {
  articleValidator,
  articleExists,
  commentValidator
} = require(`../../middlewares`);


const articleRouter = (app, articleService, commentService) => {
  const route = new Router();

  app.use(`/articles`, route);

  route.get(`/`, async (req, res) => {
    const {limit, offset, hot} = req.query;
    let results;
    if (limit || offset) {
      results = await articleService.findPage({limit, offset, hot});
    } else {
      results = await articleService.findAll();
    }
    return res.status(HttpStatusCode.OK)
      .json(results);
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

  route.post(`/`, articleValidator, async (req, res) => {
    const article = await articleService.create(req.body);

    return res.status(HttpStatusCode.CREATED)
      .json(article);
  });

  route.put(`/:articleId`, articleValidator, async (req, res) => {
    const {articleId} = req.params;
    const updateArticle = await articleService.update(articleId, req.body);
    if (!updateArticle) {
      return res.status(HttpStatusCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }


    return res.status(HttpStatusCode.OK)
      .send(`Updated`);
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

  route.post(`/:articleId/comments`, [articleExists(articleService), commentValidator], async (req, res) => {
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
