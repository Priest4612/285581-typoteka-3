'use strict';

const Alias = require(`../models/alias`);
const Sequelize = require(`sequelize`);
/* const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`); */


class ArticleService {
  constructor(sequelize) {
    this._Article = sequelize.models.Article;
    this._Comment = sequelize.models.Comment;
    this._User = sequelize.models.User;
  }

  async findAll(needCount) {
    const include = [Alias.IMAGES, Alias.CATEGORIES, Alias.COMMENTS];
    let result = [];
    if (needCount) {
      result = await this._Article.findAll({
        attributes: [
          `id`,
          `title`,
          `announce`,
          `createdAt`,
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
          [`createdAt`, `DESC`],
        ],
        include: [{
          model: this._Comment,
          as: Alias.COMMENTS,
          attributes: []
        }]
      });
      return await result.map((it) => it.get());
    } else {
      result = await this._Article.findAll({include});
      return result.map((it) => it.get());
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
    const deleteRows = await this._Article.destroy({
      where: {id}
    });

    return !!deleteRows;
  }
}


module.exports = {
  ArticleService,
};
