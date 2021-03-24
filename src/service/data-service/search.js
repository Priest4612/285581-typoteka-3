'use strict';

const {Op} = require(`sequelize`);
const Alias = require(`../db/alias`);

class SearchService {
  constructor(sequelize) {
    this._Article = sequelize.models.Article;
  }

  async findAll(searchText) {
    const result = await this._Article.findAll({
      where: {
        title: {
          [Op.substring]: searchText
        }
      },
      include: [Alias.CATEGORIES, Alias.IMAGES]
    });

    return result.map((article) => article.get());
  }
}


module.exports = {
  SearchService,
};
