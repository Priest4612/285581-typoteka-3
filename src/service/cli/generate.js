'use strict';
const chalk = require(`chalk`);
const path = require(`path`);

const Utils = require(`../../utils`);
const {
  arrayUtils,
  dateUtils,
  fileUtils,
} = Utils;
const {ExitCode} = require(`../../constants`);
const {PROJECT_DIR} = require(`../../../settings`);


const ROOT_PATH = PROJECT_DIR;
const FILE_NAME = path.join(ROOT_PATH, `mock.json`);

const DATE_PATH = path.join(ROOT_PATH, `date`);
const FILE_TITLES_PATH = path.join(DATE_PATH, `titles.txt`);
const FILE_SENTENCES_PATH = path.join(DATE_PATH, `sentences.txt`);
const FILE_CATEGORIES_PATH = path.join(DATE_PATH, `categories.txt`);

const ArticleRestrict = {
  DEFAULT_COUNT: 1,
  MAX_COUNT: 1000,
};

const AnnounceRestrict = {
  MIN: 1,
  MAX: 5,
};

const DateRestrict = {
  MIN: 0,
  MAX: 3
};

const generateArticles = (count, titles, sentences, categories) => {
  return Array(count).fill({}).map(() => ({
    title: arrayUtils.getOneRandomElement(titles),
    announce: arrayUtils.getRandomElements(sentences, AnnounceRestrict.MIN, AnnounceRestrict.MAX).join(` `),
    fullText: arrayUtils.getRandomElements(sentences).join(` `),
    createDate: dateUtils.getRandomDate(DateRestrict.MIN, DateRestrict.MAX),
    category: arrayUtils.getRandomElements(categories),
  }));
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || ArticleRestrict.DEFAULT_COUNT;

    const title = await fileUtils.readFileToArray(FILE_TITLES_PATH);
    const sentences = await fileUtils.readFileToArray(FILE_SENTENCES_PATH);
    const categories = await fileUtils.readFileToArray(FILE_CATEGORIES_PATH);

    if (countOffer <= ArticleRestrict.MAX_COUNT) {
      await fileUtils.writeFileJSON(FILE_NAME, generateArticles(countOffer, title, sentences, categories));
    } else {
      console.error(chalk.red(`Не больше ${ArticleRestrict.MAX_COUNT} объявлений.`));
      process.exit(ExitCode.ERROR);
    }
  }
};
