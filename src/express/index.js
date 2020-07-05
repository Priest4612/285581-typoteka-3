'use strict';
const express = require(`express`);

const settings = require(`../../settings`);

const {mainRouter} = require(`./routes/main-routes`);
const {myRouter} = require(`./routes/my-routes`);
const {articlesRouter} = require(`./routes/articles-routes`);


const DEFAULT_PORT = settings.DEFAULT_PORT;
const app = express();

app.use(`/`, mainRouter);
app.use(`/my`, myRouter);
app.use(`/articles`, articlesRouter);

app.listen(DEFAULT_PORT,
    () => console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`));
