'use strict';

class CategoryService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    const categories = this._articles.reduce((acc, articles) => {
      acc.add(...articles.category);
      return acc;
    }, new Set());

    return [...categories];
  }
}


module.exports = {
  CategoryService,
};
