'use strict';

const faker = require(`faker`);
const {sequelize} = require(`../db/models`);
const {initDB} = require(`../lib/init-db`);
const {getLogger} = require(`../lib/logger`);
const {nanoid} = require(`nanoid`);

const {
  getRandomInt,
  arrayUtils: {
    getOneRandomElement,
    getRandomElements,
  },
  fileUtils: {
    readTextFileToArray,
  },
} = require(`../../utils`);

const {
  ExitCode,
  GenerateFileRequirements: {
    DEFAULT_ARTICLES_COUNT,
    MAX_ARTICLES_COUNT,
    MAX_ARTICLES_MESSAGE,
    MAX_COMMENTS,
    MAX_USERS,
    MIN_ANNOUNCE_STRING,
    MAX_ANNOUNCE_STRING,
  },
  DataFilePath,
} = require(`../../constants`);


const generateUsers = () =>
  Array(MAX_USERS).fill({}).map((_item, index) => ({
    userRoleId: index === 0 ? 1 : 2,
    firstname: `${faker.name.firstName()}`,
    lastname: `${faker.name.lastName()}`,
    email: `${faker.internet.email()}`,
    password: nanoid(getRandomInt(6, 15)),
    avatar: `/img/avatar-${index + 1}.png`
  }));

const generateArticles = (count, title, sentences, images, comments, categories, users) =>
  Array(count).fill({}).map(() => ({
    title: getOneRandomElement(title),
    announce: getRandomElements(sentences, MIN_ANNOUNCE_STRING, MAX_ANNOUNCE_STRING).join(` `),
    fullText: getRandomElements(sentences).join(` `),
    userId: getRandomInt(1, users.length),
    categories: getRandomElements(categories),
    images: ({path: `/img/${getOneRandomElement(images)}`}),
    comments: Array(getRandomInt(1, MAX_COMMENTS))
      .fill({})
      .map(() => ({
        text: getRandomElements(comments).join(` `),
        userId: getRandomInt(1, users.length),
      }))
  }));

module.exports = {
  name: `--filldb`,
  async run(args) {
    const logger = getLogger({name: `FILL-DB`});

    try {
      const [count] = args;
      const countArticle = Number.parseInt(count, 10) || DEFAULT_ARTICLES_COUNT;

      if (countArticle > MAX_ARTICLES_COUNT) {
        logger.error(MAX_ARTICLES_MESSAGE);
        process.exit(ExitCode.ERROR);
      }

      const [sentencesContent, titlesContent, categoriesContent, commentsContent, userRolesContent, imagesContent] = await Promise.all([
        readTextFileToArray(DataFilePath.SENTENCES),
        readTextFileToArray(DataFilePath.TITLES),
        readTextFileToArray(DataFilePath.CATEGORIES),
        readTextFileToArray(DataFilePath.COMMENTS),
        readTextFileToArray(DataFilePath.USER_ROLES),
        readTextFileToArray(DataFilePath.ITEM_IMG)
      ]);


      const users = generateUsers();

      const generatedArticles = generateArticles(
          countArticle,
          titlesContent,
          sentencesContent,
          imagesContent,
          commentsContent,
          categoriesContent,
          users
      );

      await initDB(sequelize, {data: {
        roles: userRolesContent,
        users,
        categories: categoriesContent,
        articles: generatedArticles,
      }});

      logger.info(`База данныз заполнена данными`);
    } catch (err) {
      logger.error(err);
      process.exit(ExitCode.ERROR);
    }
  }
};
