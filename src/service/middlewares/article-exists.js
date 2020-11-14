'use strict';

const {HttpStatusCode} = require(`../../constants`);

const articleExists = (service) => (req, res, next) => {
  const {articleId} = req.params;
  const article = service.findOne(articleId);

  if (!article) {
    return res
      .status(HttpStatusCode.NOT_FOUND)
      .send(`Not found with ${articleId}`);
  }

  res.locals.article = article;
  return next();
};


module.exports = {
  articleExists,
};
