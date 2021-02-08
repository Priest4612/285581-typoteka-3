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
        FROM "Article" AS "Article"
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
        as: Alias.USERS
      }
    });

    return await this._Article.findByPk(id, {include});
  }

  async findByCategoryAll({id, limit, offset}) {

    const sql = `
    SELECT
      "Article"."id", "Article"."title", "Article"."announce", "Article"."createdAt",COUNT("comments".*) AS "count",
      "images"."id" AS "images.id", "images"."path" AS "images.path", "images"."articleId" AS "images.articleId",
      "categories"."id" AS "categories.id", "categories"."name" AS "categories.name",
      "categories->AtricleToCategory"."articleId" AS "categories.AtricleToCategory.articleId",
      "categories->AtricleToCategory"."categoryId" AS "categories.AtricleToCategory.categoryId"
    FROM "articles" AS "Article"
      LEFT JOIN "images" ON "Article"."id" = "images"."articleId"
      LEFT JOIN ("articleToCategories" AS "categories->AtricleToCategory"
        INNER JOIN "categories" AS "categories"
          ON "categories"."id" = "categories->AtricleToCategory"."categoryId")
      ON "Article"."id" = "categories->AtricleToCategory"."articleId"
      LEFT JOIN "comments" ON "Article"."id" = "comments"."articleId"
    WHERE "Article"."id" IN (
      SELECT "Article"."id"
      FROM "articles" AS "Article"
        INNER JOIN "articleToCategories" ON "Article"."id" = "articleToCategories"."articleId"
        INNER JOIN "categories" ON "articleToCategories"."categoryId" = "categories"."id"
      WHERE "categories"."id" = ?
      LIMIT ?
      OFFSET ?
    )
    GROUP BY
      "Article"."id",
      "images"."id",
      "categories"."id",
      "categories->AtricleToCategory"."articleId",
      "categories->AtricleToCategory"."categoryId"
    ORDER BY "Article"."createdAt" DESC
    `;

    const type = this._sequelize.QueryTypes.SELECT;
    const replacements = [id, limit, offset];

    const records = await this._sequelize.query(sql, {
      model: this._Article,
      mapToModel: true,
      type,
      replacements,
      raw: true,
      nest: true
    });

    console.log(JSON.stringify(records, null, 2));
    return records;

/*     const include = [Alias.IMAGES, Alias.CATEGORIES, Alias.COMMENTS];

    const articlesByCategory = await this._Article.findAll({
      attributes: [
        `id`
      ],
      include: [{
        attributes: [],
        model: this._Category,
        as: Alias.CATEGORIES,
        where: {
          id
        }
      }]
    });

    const articlesId = (articlesByCategory.map((it) => it.get())).map((it) => it.id);

    const result = await this._Article.findAll({
      include,
      where: {
        id: {
          [Op.in]: articlesId
        }
      },
      limit,
      offset,
    });

    return await result.map((it) => it.get()); */
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
