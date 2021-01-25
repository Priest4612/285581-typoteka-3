'use strict';

const {ExitCode} = require(`../../constants`);
const {sequelize} = require(`../lib/sequelize`);
const defineModels = require(`../models`);
const {getLogger} = require(`../lib/logger`);

module.exports = {
  name: `--initdb`,
  async run() {
    const logger = getLogger({name: `INIT-DB`});
    try {
      logger.info(`Попытка создать структуру базы данных`);
      await defineModels(sequelize);
      await sequelize.sync({force: true});
      await sequelize.close();
      logger.info(`Структура БД успешно создана.`);
    } catch (err) {
      logger.error(err);
      process.exit(ExitCode.ERROR);
    }
  }
};
