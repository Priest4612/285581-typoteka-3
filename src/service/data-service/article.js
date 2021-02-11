'use strict';

const Alias = require(`../models/alias`);
const {Op} = require(`sequelize`);


class ArticleService {
  constructor(sequelize) {
    this._sequelize = sequelize;
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

      const sql = `
        SELECT "Article"."id", "Article"."announce", COUNT("comments"."articleId") AS "count"
        FROM "articles" AS "Article"
          LEFT OUTER JOIN "comments" AS "comments" ON "Article"."id" = "comments"."articleId"
        GROUP BY "Article"."id" ORDER BY "Article"."count" DESC
        LIMIT ?
        OFFSET ?;
      `;

      const type = this._sequelize.QueryTypes.SELECT;
      const replacements = [limit, offset];

      return await this._sequelize.query(sql, {type, replacements});

    } else {
      const include = [Alias.IMAGES, Alias.CATEGORIES, Alias.COMMENTS];
      const {count, rows} = await this._Article.findAndCountAll({
        limit,
        offset,
        include,
        order: [
          [`createdAt`, `DESC`],
        ],
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
        as: Alias.USERS
      }
    });

    return await this._Article.findByPk(id, {include});
  }

  async findByCategoryAll({id}) {
    const include = [Alias.CATEGORIES, Alias.IMAGES, Alias.COMMENTS];

    const findArticlesIdByCategoryId = async (categoryId) => {
      const rows = await this._Article.findAll({
        attributes: [`id`],
        include: [{
          attributes: [],
          model: this._Category,
          as: Alias.CATEGORIES,
          where: {
            id: categoryId
          }
        }],
        raw: true
      });

      return rows.map((item) => item.id);
    };

    const records = await this._Article.findAll({
      include,
      where: {
        id: {
          [Op.in]: await findArticlesIdByCategoryId(id)
        }
      }
    });

    return records.map((it) => it.get());
  }

  async findByCategoryPage({id, limit, offset}) {
    const include = [Alias.CATEGORIES, Alias.IMAGES, Alias.COMMENTS];

    const findArticlesIdByCategoryId = async (categoryId) => {
      const {count, rows} = await this._Article.findAndCountAll({
        attributes: [`id`],
        include: [{
          attributes: [],
          model: this._Category,
          as: Alias.CATEGORIES,
          where: {
            id: categoryId
          }
        }],
        limit,
        offset,
        raw: true
      });

      const articlesIdByCategoryId = rows.map((item) => item.id);

      return {count, articlesIdByCategoryId};
    };

    const {count, articlesIdByCategoryId} = await findArticlesIdByCategoryId(id);

    const records = await this._Article.findAll({
      include,
      where: {
        id: {
          [Op.in]: articlesIdByCategoryId
        }
      },
    });

    const articlesIdByCategory = records.map((it) => it.get());

    return {count, articlesIdByCategory};
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
