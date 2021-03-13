'use strict';

const {Router} = require(`express`);
const {articleRouter} = require(`../api/article/article`);
const {categoryRouter} = require(`../api/category/category`);
const {searchRouter} = require(`../api/search/search`);
const {commentRouter} = require(`../api/comment/comment`);


const {
  ArticleService,
  CategoryService,
  CommentService,
  SearchService,
} = require(`../data-service`);

const {sequelize} = require(`../db/models`);

const app = new Router();

(async () => {
  articleRouter(app, new ArticleService(sequelize), new CommentService(sequelize));
  categoryRouter(app, new CategoryService(sequelize));
  searchRouter(app, new SearchService(sequelize));
  commentRouter(app, new CommentService(sequelize));
})();


module.exports = {
  app
};
