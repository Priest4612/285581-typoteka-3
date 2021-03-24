'use strict';

const express = require(`express`);
const {sequelize} = require(`../db/models`);

const routes = require(`../api`).app;
const {ExitCode, HttpStatusCode, API_PREFIX} = require(`../../constants`);
const {DEFAULT_PORT_API} = require(`../../../settings`);
const {getLogger} = require(`../lib/logger`);


const logger = getLogger({name: `API`});
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  logger.debug(`Request on route ${req.url}`);
  res.on(`finish`, () => {
    logger.info(`Response status code ${res.statusCode}`);
  });
  next();
});

app.use(API_PREFIX, routes);

app.use((req, res) => {
  res
    .status(HttpStatusCode.NOT_FOUND)
    .send(`Not found`);
  logger.error(`Route not found: ${req.url}`);
});

app.use((err, req, res, _next) => {
  res
    .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
    .send(`INTERNAL_SERVER_ERROR: ${err.message}`);

  logger.error(`An error occured on processing request: ${err.message}`);
});


module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const DEFAUL_PORT = process.env.API_PORT || DEFAULT_PORT_API;
    const port = Number.parseInt(customPort, 10) || DEFAUL_PORT;

    try {
      logger.info(`Подключение к базе данных...`);
      await sequelize.authenticate();
      logger.info(`Соединение с базой данных установлено`);
    } catch (err) {
      logger.error(`Произошла ошибка: ${err}`);
      process.exit(ExitCode.ERROR);
    }

    try {
      app.listen(port, (err) => {
        if (err) {
          return logger.error(`Ошибка при создании сервера ${err}`);
        }
        return logger.info(`Принимаю подключения на ${port}`);
      });

    } catch (err) {
      logger.error(`Произошла ошибка ${err.message}`);
      process.exit(ExitCode.ERROR);
    }
  }
};
