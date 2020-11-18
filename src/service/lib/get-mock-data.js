'use strict';

const path = require(`path`);

const {getLogger} = require(`../lib/logger`);
const {fileUtils} = require(`../../utils`);
const {PROJECT_DIR} = require(`../../../settings`);
const FILE_NAME = `mock.json`;

const logger = getLogger({name: `GET-MOCK-DATA`});
let data = [];


const getMockData = async () => {
  if (data.length) {
    return Promise.resolve(data);
  }

  try {
    data = fileUtils.readJsonFileToArray(path.join(PROJECT_DIR, FILE_NAME));
  } catch (error) {
    logger.error(error);
    return Promise.reject(error);
  }

  return Promise.resolve(data);
};


module.exports = {
  getMockData,
};
