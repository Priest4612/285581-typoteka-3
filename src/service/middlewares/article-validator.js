'use strict';

const {HttpStatusCode} = require(`../../constants.js`);

const articleKeys = [
  `title`, `announce`, `fullText`, `category`, `userId`, `images`
];

const articleValidator = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keysExists = articleKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    return res.status(HttpStatusCode.BAD_REQUEST)
      .send(`Bad request`);
  }

  return next();
};


module.exports = {
  articleValidator,
};
