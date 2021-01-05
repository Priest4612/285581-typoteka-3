'use strict';

const path = require(`path`);
const {ExitCode} = require(`../../constants`);
const {sequelize} = require(`../lib/sequelize`);
const {getRandomInt, arrayUtils, dateUtils} = require(`../../utils`);
const {readTextFileToArray} = require(`../../utils`).fileUtils;
const {getLogger} = require(`../lib/logger`);
const {initDb, db} = require(`../db-service/db`);

const {PROJECT_DIR} = require(`../../../settings`);
const DATA_PATH = path.join(PROJECT_DIR, `data`);
const FILE_TITLES_PATH = path.join(DATA_PATH, `titles.txt`);
const FILE_SENTENCES_PATH = path.join(DATA_PATH, `sentences.txt`);
const FILE_CATEGORIES_PATH = path.join(DATA_PATH, `categories.txt`);
const FILE_COMMENTS_PATH = path.join(DATA_PATH, `comments.txt`);
const FILE_FIRSTNAME_PATH = path.join(DATA_PATH, `firstname.txt`);
const FILE_LASTNAME_PATH = path.join(DATA_PATH, `lastname.txt`);
const FILE_PASSWORD_PATH = path.join(DATA_PATH, `password.txt`);
const FILE_AVATAR_PATH = path.join(DATA_PATH, `avatar-img.txt`);
const FILE_ITEM_IMG_PATH = path.join(DATA_PATH, `item-img.txt`);
const FILE_USER_ROLE_PATH = path.join(DATA_PATH, `user-role.txt`);


const ArticleRestrict = {
  DEFAULT_COUNT: 10,
  MAX_COUNT: 1000,
};


const generateCategories = (...options) => {
  const [categories] = options;
  const count = categories.length;

  return Array(count).fill({}).map((_item, index) => ({
    id: index + 1,
    category: categories[index],
  }));
};


const generateUserRoles = (...options) => {
  const [userRoles] = options;
  const count = userRoles.length;

  return Array(count).fill({}).map((_item, index) => ({
    id: index + 1,
    role: userRoles[index],
  }));
};


const generateUsers = (count, options) => {
  const {firstnames, lastnames, roles, passwords, avatars} = options;

  return Array(count).fill({}).map((_item, index) => ({
    id: index + 1,
    userRoleId: index !== 0 ? roles[1].id : roles[0].id,
    firstname: arrayUtils.getOneRandomElement(firstnames),
    lastname: arrayUtils.getOneRandomElement(lastnames),
    email: `email-${getRandomInt(1, passwords.length)}@not-email-test.test`,
    password: arrayUtils.getOneRandomElement(passwords),
    avatar: avatars[index],
  }));
};


const generateAtricles = (count, options) => {
  const {titles, sentences, DateRestrict, users} = options;

  const AnnounceRestrict = {
    MIN: 1,
    MAX: 2,
  };

  return Array(count).fill({}).map((_item, index) => ({
    id: index + 1,
    title: arrayUtils.getOneRandomElement(titles),
    announce: arrayUtils.getRandomElements(sentences, AnnounceRestrict.MIN, AnnounceRestrict.MAX).join(` `),
    fullText: arrayUtils.getRandomElements(sentences).join(` `),
    regdate: dateUtils.getRandomDate(DateRestrict.MIN, DateRestrict.MAX),
    userId: users[0].id,
  }));
};


const generateImages = (options) => {
  const {images, articles} = options;
  const count = articles.length;

  return Array(count).fill({}).map((_item, index) => ({
    id: index + 1,
    image: `/img/${arrayUtils.getOneRandomElement(images)}`,
    articleId: articles[index].id,
  }));
};


const generateArticleToCategories = (...options) => {
  const [articles, categories] = options;
  const offerToCategories = [];

  for (let i = 0; i < articles.length; i++) {
    for (let j = 0; j < categories.length; j++) {
      const isWrite = Math.random() > 0.65;
      if (isWrite) {
        const recording = {
          articleId: i + 1,
          categoryId: j + 1,
        };
        offerToCategories.push(recording);
      }
    }
  }

  return offerToCategories;
};


const generateComments = (options) => {
  const CommentsRestrict = {
    MIN: 1,
    MAX: 4,
  };
  const {data, DateRestrict, users, articles} = options;
  const comments = [];
  let currentId = 0;
  for (let i = 0; i < articles.length; i++) {
    const countComments = getRandomInt(CommentsRestrict.MIN, CommentsRestrict.MAX);

    for (let j = 0; j < countComments; j++) {
      currentId = currentId + 1;
      const comment = {
        id: currentId,
        comment: arrayUtils.getOneRandomElement(data),
        createDate: dateUtils.getRandomDate(DateRestrict.MIN, DateRestrict.MAX),
        userId: arrayUtils.getOneRandomElement(users).id,
        articleId: i + 1,
      };
      comments.push(comment);
    }
  }
  return comments;
};


module.exports = {
  name: `--fill-db`,
  async run(args) {
    const logger = getLogger({name: `GENERATE`});

    try {
      const [count] = args;
      const countArticle = Number.parseInt(count, 10) || ArticleRestrict.DEFAULT_COUNT;

      const categories = generateCategories(await readTextFileToArray(FILE_CATEGORIES_PATH));

      const userRoles = generateUserRoles(await readTextFileToArray(FILE_USER_ROLE_PATH));


      const UserRestrict = {
        MIN: 1,
        MAX: 5,
      };

      const userOptions = {
        firstnames: await readTextFileToArray(FILE_FIRSTNAME_PATH),
        lastnames: await readTextFileToArray(FILE_LASTNAME_PATH),
        roles: userRoles,
        passwords: await readTextFileToArray(FILE_PASSWORD_PATH),
        avatars: await readTextFileToArray(FILE_AVATAR_PATH),
      };

      const users = generateUsers(UserRestrict.MAX, userOptions);


      const DateRestrict = {
        MIN: 0,
        MAX: 3
      };

      const articleOptions = {
        titles: await readTextFileToArray(FILE_TITLES_PATH),
        sentences: await readTextFileToArray(FILE_SENTENCES_PATH),
        DateRestrict,
        users,
      };

      const articles = generateAtricles(countArticle, articleOptions);


      const imageOptions = {
        images: await readTextFileToArray(FILE_ITEM_IMG_PATH),
        articles,
      };

      const images = generateImages(imageOptions);

      const articleToCategories = generateArticleToCategories(articles, categories);


      const commentOptions = {
        data: await readTextFileToArray(FILE_COMMENTS_PATH),
        DateRestrict,
        users,
        articles,
      };

      const comments = generateComments(commentOptions);


      await initDb();
      logger.info(`Заполняем таблицы:`);
      logger.info(`Категории`);
      await db.Category.bulkCreate(categories);
      logger.info(`Успешно!`);
      logger.info(`Роли пользователей`);
      await db.UserRole.bulkCreate(userRoles);
      logger.info(`Успешно!`);
      logger.info(`Пользователи`);
      await db.User.bulkCreate(users);
      logger.info(`Успешно!`);
      logger.info(`Публикации`);
      await db.Article.bulkCreate(articles);
      logger.info(`Успешно!`);
      logger.info(`Изображения`);
      await db.Image.bulkCreate(images);
      logger.info(`Успешно!`);
      logger.info(`Связь между публикациями и категориями`);
      await db.ArticleToCategory.bulkCreate(articleToCategories);
      logger.info(`Успешно!`);
      logger.info(`Комментарии`);
      await db.Comment.bulkCreate(comments);
      logger.info(`Успешно!`);
      await sequelize.close();
    } catch (err) {
      logger.error(err);
      process.exit(ExitCode.ERROR);
    }
  }
};
