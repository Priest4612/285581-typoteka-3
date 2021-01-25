'use strict';

const Alias = require(`../models/alias`);

/* const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`); */


class ArticleService {
  constructor(sequelize) {
    this._Article = sequelize.models.Article;
  }

  async findAll(needCount) {
    const include = [Alias.IMAGES, Alias.CATEGORIES, Alias.COMMENTS];
    let result = [];
    if (needCount) {
      return result;
    } else {
      result = await this._Article.findAll({include});
      return result.map((it) => it.get());
    }
  }

/*   findOne(id) {
    return this._articles
      .find((item) => item.id === id);
  }

  create(article) {
    const newArticle = Object
      .assign({id: nanoid(MAX_ID_LENGTH), comments: []}, article);

    this._articles.push(newArticle);
    return newArticle;
  }

  update(id, article) {
    const oldArticle = this._articles
      .find((item) => item.id === id);

    return Object.assign(oldArticle, article);
  }

  drop(id) {
    const article = this._articles
      .find((item) => item.id === id);

    if (!article) {
      return null;
    }

    this._articles = this._articles
      .filter((item) => item.id !== id);

    return article;
  } */
}


module.exports = {
  ArticleService,
};
