'use strict';
const chalk = require(`chalk`);
const path = require(`path`);

const {
  arrayUtils,
  dateUtils,
  fileUtils,
} = require(`../../utils`);
const {ExitCode} = require(`../../constants`);
const {PROJECT_DIR} = require(`../../../settings`);


const ROOT_PATH = PROJECT_DIR;
const FILE_NAME = path.join(ROOT_PATH, `mock.json`);

const DATE_PATH = path.join(ROOT_PATH, `data`);
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


const readContent = async (filePath) => {
  try {
    return await fileUtils.readFileToArray(filePath);
  } catch (err) {
    console.error(chalk.red(err));
    return process.exit(ExitCode.ERROR);
  }
};

const saveMock = async (fileName, content) => {
  try {
    await fileUtils.writeFileJSON(fileName, content);
    console.log(chalk.green(`Operation success. File created.`));
  } catch (err) {
    console.error(chalk.red(err));
    process.exit(ExitCode.ERROR);
  }
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

    const title = await readContent(FILE_TITLES_PATH);
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);

    if (countOffer <= ArticleRestrict.MAX_COUNT) {
      await saveMock(FILE_NAME, generateArticles(countOffer, title, sentences, categories));
    } else {
      console.error(chalk.red(`Не больше ${ArticleRestrict.MAX_COUNT} объявлений.`));
      process.exit(ExitCode.ERROR);
    }
  }
};
