'use strict';

const Alias = require(`../models/alias`);
const Sequelize = require(`sequelize`);


class ArticleService {
  constructor(sequelize) {
    this._Article = sequelize.models.Article;
    this._Comment = sequelize.models.Comment;
    this._User = sequelize.models.User;
    this._Image = sequelize.models.Image;
    this._Category = sequelize.models.Category;
  }

  async findAll() {
    const include = [Alias.IMAGES, Alias.CATEGORIES, Alias.COMMENTS];
    const result = await this._Article.findAll({include});
    return await result.map((it) => it.get());
  }

  async findPage({limit, offset, hot}) {
    if (hot) {
      const results = await this._Article.findAll(
          {
            attributes: [
              `id`,
              `announce`,
              [
                Sequelize.fn(
                    `COUNT`,
                    `*`
                ),
                `count`
              ]
            ],
            group: [Sequelize.col(`Article.id`)],
            order: [
              [`count`, `DESC`],
            ],
            include: [{
              model: this._Comment,
              as: Alias.COMMENTS,
              attributes: []
            }],
          },
          limit,
          offset,
      );

      return results;
    } else {
      const include = [Alias.IMAGES, Alias.CATEGORIES, Alias.COMMENTS];
      const {count, rows} = await this._Article.findAndCountAll({
        limit,
        offset,
        include,
        order: [
          [`createdAt`, `DESC`],
        ],
        distinct: true,
      });
      return {count, articles: rows};
    }
  }

  async findOne(id) {
    const include = [Alias.CATEGORIES, Alias.IMAGES];

    include.push({
      model: this._Comment,
      as: Alias.COMMENTS,
      include: {
        model: this._User,
        as: Alias.USERS,
        attributes: [
          `firstname`,
          `lastname`
        ]
      }

    });

    return await this._Article.findByPk(id, {include});
  }

  async create(articleData) {
    const article = await this._Article.create(articleData, {include: [Alias.IMAGES]});
    await article.addCategories(articleData.categories);
    return article.get();
  }

  async update(id, articleData) {
    const [affectedRows] = await this._Article.update(articleData, {
      where: {id}
    });

    return !!affectedRows;
  }

  async drop(id) {
    const deletedRows = await this._Article.destroy({
      where: {id}
    });

    return !!deletedRows;
  }
}


module.exports = {
  ArticleService,
};
