'use strict';

const faker = require(`faker`);
const {sequelize} = require(`../lib/sequelize`);
const {getLogger} = require(`../lib/logger`);
const {nanoid} = require(`nanoid`);
const defineModels = require(`../models`);
const Alias = require(`../models/alias`);

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


const generateUserRoles = (userRoles) =>
  userRoles.map((role) => ({name: role}));

const generateCategories = (categories) =>
  categories.map((category) => ({name: category}));

const generateUsers = (roles) =>
  Array(MAX_USERS).fill({}).map((_item, index) => ({
    userRoleId: index === 0 ? roles[0].id : roles[1].id,
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
    userId: getOneRandomElement(users).id,
    categories: getRandomElements(categories).map((category) => category.id),
    [Alias.IMAGES]: ({path: `/img/${getOneRandomElement(images)}`}),
    [Alias.COMMENTS]: Array(getRandomInt(1, MAX_COMMENTS))
      .fill({})
      .map(() => ({
        text: getRandomElements(comments).join(` `),
        userId: getOneRandomElement(users).id,
      }))
  }));

module.exports = {
  name: `--filldb`,
  async run(args) {
    const logger = getLogger({name: `FILL-DB`});

    try {
      const {Category, Article, UserRole, User} = defineModels(sequelize);
      await sequelize.sync({force: true});

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

      const [roles, categories] = await Promise.all([
        UserRole.bulkCreate(generateUserRoles(userRolesContent)),
        Category.bulkCreate(generateCategories(categoriesContent))
      ]);

      const users = await User.bulkCreate(generateUsers(roles));

      const generatedArticles = generateArticles(
          countArticle,
          titlesContent,
          sentencesContent,
          imagesContent,
          commentsContent,
          categories,
          users
      );

      await Promise.all(
          generatedArticles
            .map(async (article) => {
              const createdArticle = await Article.create(article, {include: [Alias.IMAGES, Alias.COMMENTS]});
              await createdArticle.addCategories(article.categories);
            })
      );
      logger.info(`База данныз заполнена данными`);
      await sequelize.close();
    } catch (err) {
      logger.error(err);
      process.exit(ExitCode.ERROR);
    }
  }
};
