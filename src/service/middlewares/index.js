'use strict';

const {articleValidator} = require(`../middlewares/article-validator`);
const {articleExists} = require(`../middlewares/article-exists`);
const {commentValidator} = require(`../middlewares/comment-validator`);


module.exports = {
  articleValidator,
  articleExists,
  commentValidator,
};
