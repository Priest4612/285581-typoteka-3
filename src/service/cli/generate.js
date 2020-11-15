'use strict';
const chalk = require(`chalk`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);

const {
  arrayUtils,
  dateUtils,
  fileUtils,
  getRandomInt,
} = require(`../../utils`);
const {ExitCode, MAX_ID_LENGTH} = require(`../../constants`);
const {PROJECT_DIR} = require(`../../../settings`);


const ROOT_PATH = PROJECT_DIR;
const FILE_NAME = path.join(ROOT_PATH, `mock.json`);

const DATA_PATH = path.join(ROOT_PATH, `data`);
const FILE_TITLES_PATH = path.join(DATA_PATH, `titles.txt`);
const FILE_SENTENCES_PATH = path.join(DATA_PATH, `sentences.txt`);
const FILE_CATEGORIES_PATH = path.join(DATA_PATH, `categories.txt`);
const FILE_COMMENTS_PATH = path.join(DATA_PATH, `comments.txt`);

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

const CommentRestrict = {
  MIN: 1,
  MAX: 4,
};

const generateComments = (count, comments) => {
  return Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: arrayUtils.getOneRandomElement(comments),
  }));
};

const generateArticles = (count, options) => {
  const {titles, sentences, categories, comments} = options;

  return Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    title: arrayUtils.getOneRandomElement(titles),
    announce: arrayUtils.getRandomElements(sentences, AnnounceRestrict.MIN, AnnounceRestrict.MAX).join(` `),
    fullText: arrayUtils.getRandomElements(sentences).join(` `),
    createDate: dateUtils.getRandomDate(DateRestrict.MIN, DateRestrict.MAX),
    category: arrayUtils.getRandomElements(categories),
    comments: generateComments(getRandomInt(CommentRestrict.MIN, CommentRestrict.MAX), comments),
  }));
};

module.exports = {
  name: `--generate`,
  async run(args) {
    try {
      const [count] = args;
      const countOffer = Number.parseInt(count, 10) || ArticleRestrict.DEFAULT_COUNT;

      const options = {
        titles: await fileUtils.readTextFileToArray(FILE_TITLES_PATH),
        sentences: await fileUtils.readTextFileToArray(FILE_SENTENCES_PATH),
        categories: await fileUtils.readTextFileToArray(FILE_CATEGORIES_PATH),
        comments: await fileUtils.readTextFileToArray(FILE_COMMENTS_PATH),
      };

      if (countOffer > ArticleRestrict.MAX_COUNT) {
        console.error(chalk.red(`Не больше ${ArticleRestrict.MAX_COUNT} объявлений.`));
        process.exit(ExitCode.ERROR);
      }

      await fileUtils.writeFileJSON(FILE_NAME, generateArticles(countOffer, options));
      console.log(chalk.green(`Operation success. File created.`));

    } catch (err) {
      console.error(chalk.red(err));
      process.exit(ExitCode.ERROR);
    }
  }
};
