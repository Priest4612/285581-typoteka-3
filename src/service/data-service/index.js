'use strict';

const {ArticleService} = require(`../data-service/article`);
const {CategoryService} = require(`../data-service/category`);
const {CommentService} = require(`../data-service/comment`);
const {SearchService} = require(`../data-service/search`);


module.exports = {
  ArticleService,
  CategoryService,
  CommentService,
  SearchService,
};
