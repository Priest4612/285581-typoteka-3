'use strict';

const {Router} = require(`express`);
const {articleRouter} = require(`../api/article`);
const {categoryRouter} = require(`../api/category`);
const {searchRouter} = require(`../api/search`);

const {getMockData} = require(`../lib/get-mock-data`);

const {
  ArticleService,
  CategoryService,
  CommentService,
  SearchService,
} = require(`../data-service`);

const app = new Router();

(async () => {
  const mockData = await getMockData();

  articleRouter(app, new ArticleService(mockData), new CommentService(mockData));
  categoryRouter(app, new CategoryService(mockData));
  searchRouter(app, new SearchService(mockData));
})();

module.exports = app;
