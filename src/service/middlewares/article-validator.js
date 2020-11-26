'use strict';

const {HttpStatusCode} = require(`../../constants.js`);

const articleRequiredKeys = [
  `title`, `announce`, `fullText`, `createDate`, `category`
];

const articleNonRequiredKeys = [`picture`];

const articleValidator = (req, res, next) => {
  let filteredData;

  filteredData = articleRequiredKeys.reduce((acc, key) => {
    if (req.body[key]) {
      acc[key] = req.body[key];
    }
    return acc;
  }, {});
  const articleKeys = Object.keys(filteredData);
  const isRequiredKeysMatch = articleRequiredKeys.every((key) =>
    articleKeys.includes(key)
  );

  if (!isRequiredKeysMatch) {
    return res.status(HttpStatusCode.BAD_REQUEST).send(`BAD REQUEST`);
  }

  articleNonRequiredKeys.forEach((key) => {
    filteredData[key] = req.body[key];
  });

  req.body = filteredData;

  return next();
};


module.exports = {
  articleValidator,
};
