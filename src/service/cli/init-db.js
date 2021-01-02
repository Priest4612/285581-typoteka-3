'use strict';

const {sequelize, initDb} = require(`../db-service/db`);
const {ExitCode} = require(`../../constants`);
const {getLogger} = require(`../lib/logger`);

module.exports = {
  name: `--initdb`,
  async run() {
    const logger = getLogger({name: `INIT-DB`});
    try {
      logger.info(`Попытка создать структуру базы данных`);
      await initDb();
      await sequelize.close();
    } catch (err) {
      logger.error(err);
      process.exit(ExitCode.ERROR);
    }
  }
};
