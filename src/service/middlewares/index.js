'use strict';

const {articleValidator} = require(`../middlewares/article-validator`);
const {articleExists} = require(`../middlewares/article-exists`);
const {commentValidator} = require(`../middlewares/comment-validator`);
const {schemaValidator} = require(`../middlewares/schema-validator`);


module.exports = {
  articleValidator,
  articleExists,
  commentValidator,
  schemaValidator,
};
