'use strict';
const fs = require(`fs`);
const {Utils} = require(`../../utils`);
const {getRandomInt, shuffle} = Utils;

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mock.json`;

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
  min: 1,
  max: 5,
};

const DateRestrict = {
  min: 0,
  max: 3
};

const changeNumberFormat = (number) => number > 10 ? `${number}` : `0${number}`;

const getRandomeDate = () => {
  const date = new Date();
  const dateArticle = new Date(date.getTime() - Math.random() * getRandomInt(DateRestrict.min, DateRestrict.max) * 24 * 30 * 60 * 60 * 1000);

  const year = dateArticle.getFullYear();
  const month = changeNumberFormat(dateArticle.getMonth() + 1);
  const day = changeNumberFormat(dateArticle.getDate());
  const hours = changeNumberFormat(dateArticle.getHours());
  const minutes = changeNumberFormat(dateArticle.getMinutes());
  const seconds = changeNumberFormat(dateArticle.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const generateArticles = (count) => {
  return Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    announce: shuffle(SENTENCES).slice(AnnounceRestrict.min, getRandomInt(AnnounceRestrict.min, AnnounceRestrict.max) + 1).join(` `),
    fullText: shuffle(SENTENCES).slice(1, getRandomInt(1, SENTENCES.length - 1) + 1).join(` `),
    createDate: getRandomeDate(),
    category: shuffle(CATEGORIES).slice(1, getRandomInt(1, CATEGORIES.length - 1) + 1),
  }));
};

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countArticles = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countArticles <= MAX_COUNT) {
      const content = JSON.stringify(generateArticles(countArticles));
      fs.writeFile(FILE_NAME, content, (err) => {
        if (err) {
          return console.error(`Can't write data file...`);
        }

        return console.log(`Operation success. File created.`);
      });
    } else {
      console.log(`Не больше 1000 объявлений.`);
    }
  }
};
