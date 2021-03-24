'use strict';

const Alias = require(`../db/alias`);

class CommentService {
  constructor(sequelize) {
    this._Comment = sequelize.models.Comment;
  }

  async findAll() {
    let results;
    const include = [Alias.USERS, Alias.ARTICLES];
    results = await this._Comment.findAll({include});
    return await results.map((it) => it.get());
  }

  async findPage({limit, offset, last}) {
    let results;
    if (last) {
      results = await this._Comment.findAll({
        limit,
        offset,
        include: [Alias.USERS],
        order: [
          [`createdAt`, `DESC`],
        ],
      });
    } else {
      results = await this._Comment.findAll({
        limit,
        offset,
        include: [Alias.USERS],
        order: [
          [`createdAt`, `DESC`],
        ],
      });
    }
    return await results.map((it) => it.get());
  }

  async findAllToArticle(articleId) {
    return await this._Comment.findAll({
      where: {articleId},
      raw: true
    });
  }

  create(articleId, comment) {
    return this._Comment.create({
      articleId,
      ...comment,
    });
  }

  async drop(id) {
    const deleteRaw = await this._Comment.destroy({
      where: {id}
    });

    return !!deleteRaw;
  }
}


module.exports = {
  CommentService,
};
