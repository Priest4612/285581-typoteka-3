'use strict';

const renderQueryString = (object) => {
  const keys = Object.keys(object);
  let queryString = `?`;

  if (keys.length === 0) {
    return queryString;
  }

  keys.forEach((key) => {
    let value = object[key];
    let arrayString = ``;

    if (Array.isArray(value)) {

      value.forEach((element) => {
        arrayString = `${arrayString}${key}=${element}&`;
      });

      queryString = `${queryString}${arrayString}`;
      return;
    }

    queryString = `${queryString}${key}=${value}&`;
  });

  return queryString.slice(0, -1);
};


module.exports = {
  renderQueryString,
};
