'use strict';
const fs = require(`fs`);
const path = require(`path`);

const utils = require(`../../utils`);
const {
  arrayUtils,
  dateUtils,
} = utils;
const {ExitCode} = require(`../../constants`);
const {PROJECT_DIR} = require(`../../../settings`);

const articleRestrict = {
  DEFAULT_COUNT: 1,
  MAX_COUNT: 1000,
};

const FILE_NAME = path.join(PROJECT_DIR, `mock.json`);

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`
];

const SENTENCES = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`
];

const AnnounceRestrict = {
  MIN: 1,
  MAX: 5,
};

const DateRestrict = {
  MIN: 0,
  MAX: 3
};

const generateArticles = (count) => {
  return Array(count).fill({}).map(() => ({
    title: arrayUtils.getOneRandomElement(TITLES),
    announce: arrayUtils.getRandomElements(SENTENCES, AnnounceRestrict.MIN, AnnounceRestrict.MAX).join(` `),
    fullText: arrayUtils.getRandomElements(SENTENCES).join(` `),
    createDate: dateUtils.getRandomDate(DateRestrict.MIN, DateRestrict.MAX),
    category: arrayUtils.getRandomElements(CATEGORIES),
  }));
};

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countArticles = Number.parseInt(count, 10) || articleRestrict.DEFAULT_COUNT;

    if (countArticles <= articleRestrict.MAX_COUNT) {
      const content = JSON.stringify(generateArticles(countArticles));
      fs.writeFile(FILE_NAME, content, (err) => {
        if (err) {
          console.error(`Can't write data file...`);
          return process.exit(ExitCode.ERROR);
        }

        return console.log(`Operation success. File created.`);
      });
    } else {
      console.log(`Не больше 1000 объявлений.`);
      process.exit(ExitCode.ERROR);
    }
  }
};
