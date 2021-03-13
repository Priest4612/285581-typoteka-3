'use strict';

const Sequelize = require(`sequelize`);
const Alias = require(`../db/alias`);

class CategoryService {
  constructor(sequelize) {
    this._Category = sequelize.models.Category;
    this._ArticleToCategory = sequelize.models.ArticleToCategory;
  }

  async findAll() {
    const result = await this._Category.findAll({
      attributes: [
        `id`,
        `name`,
        [
          Sequelize.fn(
              `COUNT`,
              Sequelize.col(`articleToCategories.articleId`)
          ),
          `count`
        ]
      ],
      group: [Sequelize.col(`Category.id`)],
      order: [
        [`id`, `ASC`],
      ],
      include: [{
        model: this._ArticleToCategory,
        as: Alias.ARTICLE_TO_CATEGORIES,
        attributes: []
      }]
    });
    return await result.map((it) => it.get());
  }
}


module.exports = {
  CategoryService,
};
