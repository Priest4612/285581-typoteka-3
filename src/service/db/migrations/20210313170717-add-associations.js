'use strict';
const Alias = require(`../alias`);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        Alias.USERS,
        `userRoleId`,
        {
          type: Sequelize.INTEGER,
          references: {
            model: Alias.USER_ROLES,
            key: `id`
          },
          onUpdate: `CASCADE`,
          onDelete: `SET NULL`,
        }

    )
    .then(() => {
      return queryInterface.addColumn(
          Alias.ARTICLES,
          `userId`,
          {
            type: Sequelize.INTEGER,
            references: {
              model: Alias.USERS,
              key: `id`,
            },
            onUpdate: `CASCADE`,
            onDelete: `SET NULL`,
          }
      );
    })
    .then(() => {
      return queryInterface.addColumn(
          Alias.IMAGES,
          `articleId`,
          {
            type: Sequelize.INTEGER,
            references: {
              model: Alias.ARTICLES,
              key: `id`,
            },
            onUpdate: `CASCADE`,
            onDelete: `SET NULL`,
          }
      );
    })
    .then(() => {
      return queryInterface.addColumn(
          Alias.COMMENTS,
          `userId`,
          {
            type: Sequelize.INTEGER,
            references: {
              model: Alias.USERS,
              key: `id`,
            },
            onUpdate: `CASCADE`,
            onDelete: `SET NULL`,
          }
      );
    })
    .then(() => {
      return queryInterface.addColumn(
          Alias.COMMENTS,
          `articleId`,
          {
            type: Sequelize.INTEGER,
            references: {
              model: Alias.ARTICLES,
              key: `id`,
            },
            onUpdate: `CASCADE`,
            onDelete: `SET NULL`,
          }
      );
    })
    .then(() => {
      return queryInterface.addColumn(
          Alias.ARTICLE_TO_CATEGORIES,
          `categoryId`,
          {
            type: Sequelize.INTEGER,
            references: {
              model: Alias.CATEGORIES,
              key: `id`,
            },
            onUpdate: `CASCADE`,
            onDelete: `CASCADE`,
          }
      );
    })
    .then(() => {
      return queryInterface.addColumn(
          Alias.ARTICLE_TO_CATEGORIES,
          `articleId`,
          {
            type: Sequelize.INTEGER,
            references: {
              model: Alias.ARTICLES,
              key: `id`,
            },
            onUpdate: `CASCADE`,
            onDelete: `CASCADE`,
          }
      );
    });
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.removeColumn(
        Alias.USERS,
        `userRoleId`,
    )
    .then(() => {
      return queryInterface.removeColumn(
          Alias.ARTICLES,
          `userId`,
      );
    })
    .then(() => {
      return queryInterface.removeColumn(
          Alias.IMAGES,
          `articleId`,
      );
    })
    .then(() => {
      return queryInterface.removeColumn(
          Alias.COMMENTS,
          `userId`,
      );
    })
    .then(() => {
      return queryInterface.removeColumn(
          Alias.COMMENTS,
          `articleId`,
      );
    })
    .then(() => {
      return queryInterface.removeColumn(
          Alias.ARTICLE_TO_CATEGORIES,
          `categoryId`,
      );
    })
    .then(() => {
      return queryInterface.removeColumn(
          Alias.ARTICLE_TO_CATEGORIES,
          `articleId`,
      );
    });
  }
};
