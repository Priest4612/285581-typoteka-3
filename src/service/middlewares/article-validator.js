'use strict';

const {HttpStatusCode} = require(`../../constants.js`);

const articleKeys = [`title`, `announce`, `fullText`, `createDate`, `category`];

const articleValidator = (req, res, next) => {
  const newOffer = req.body;
  const keys = Object.keys(newOffer);
  const keysExists = articleKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .send(`Bad request`);
  }

  return next();
};


module.exports = {
  articleValidator,
};