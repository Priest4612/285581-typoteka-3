'use strict';

const {Router} = require(`express`);
const {articleRouter} = require(`../api/article/article`);
const {categoryRouter} = require(`../api/category/category`);
const {searchRouter} = require(`../api/search/search`);

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

  articleRouter(app, new ArticleService(mockData), new CommentService());
  categoryRouter(app, new CategoryService(mockData));
  searchRouter(app, new SearchService(mockData));
})();

module.exports = {
  app
};
