'use strict';

const getRandomInt = require(`./get-random-int`);

const changeNumberFormat = (number) => number < 10 ? `0${number}` : `${number}`;

const getRandomDate = (min, max) => {
  const date = new Date();
  const dateArticle = new Date(date.getTime() - Math.random() * getRandomInt(min, max) * 24 * 30 * 60 * 60 * 1000);

  const year = dateArticle.getFullYear();
  const month = changeNumberFormat(dateArticle.getMonth() + 1);
  const day = changeNumberFormat(dateArticle.getDate());
  const hours = changeNumberFormat(dateArticle.getHours());
  const minutes = changeNumberFormat(dateArticle.getMinutes());
  const seconds = changeNumberFormat(dateArticle.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

module.exports = {
  getRandomDate,
};
