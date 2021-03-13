'use strict';
const express = require(`express`);

const {getLogger} = require(`../service/lib/logger`);

const {DEFAULT_PORT_FRONT} = require(`../../settings`);
const {mainRouter} = require(`./routes/main-routes`);
const {
  HttpStatusCode,
  FrontDir: {
    PUBLIC_DIR,
    TEMPLATES_DIR
  }
} = require(`../constants.js`);


const port = process.env.FRONT_PORT || DEFAULT_PORT_FRONT;

const logger = getLogger({name: `EXPRESS`});
const app = express();

app.set(`view engine`, `pug`);
app.set(`views`, TEMPLATES_DIR);
app.use(express.static(PUBLIC_DIR));

app.use(`/`, mainRouter);

app.use((req, res) => res
  .status(HttpStatusCode.BAD_REQUEST)
  .render(`errors/404.pug`));

app.use((err, req, res, _next) => {
  logger.error(`errors/500: ${err}`);

  res
    .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
    .render(`errors/500.pug`);
});

app.listen(port,
    () => logger.info(`Сервер запущен на порту: ${port}`));
