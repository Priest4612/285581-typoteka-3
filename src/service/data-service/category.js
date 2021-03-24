'use strict';

const {Sequelize} = require(`../db/models`);
const Alias = require(`../db/alias`);

class CategoryService {
  constructor(sequelize) {
    this._Category = sequelize.models.Category;
    this._ArticleToCategory = sequelize.models.ArticleToCategory;
  }

  async findAll({needCount}) {
    const attributes = [
      `id`,
      `name`,
    ];
    const group = [];
    const order = [];
    const include = [];

    if (Number.parseInt(needCount, 10)) {
      attributes.push(
          Sequelize.fn(
              `COUNT`,
              Sequelize.col(`articleToCategories.articleId`)
          ),
          `count`
      );
      group.push(Sequelize.col(`Category.id`));
      include.push({
        model: this._ArticleToCategory,
        as: Alias.ARTICLE_TO_CATEGORIES,
        attributes: []
      });
    }

    const options = {
      attributes,
      group,
      order,
      include,
    };

    const result = await this._Category.findAll(options);
    return await result.map((it) => it.get());
  }
}


module.exports = {
  CategoryService,
};
