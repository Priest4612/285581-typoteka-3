'use strict';

const Sequelize = require(`sequelize`);
const Alias = require(`../models/alias`);

class CategoryService {
  constructor(sequelize) {
    this._Category = sequelize.models.Category;
    this._AtricleToCategory = sequelize.models.AtricleToCategory;
  }

  async findAll() {
    const result = await this._Category.findAll({
      attributes: [
        `id`,
        `name`,
        [
          Sequelize.fn(
              `COUNT`,
              `*`
          ),
          `count`
        ]
      ],
      group: [Sequelize.col(`Category.id`)],
      order: [
        [`id`, `ASC`],
      ],
      include: [{
        model: this._AtricleToCategory,
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
