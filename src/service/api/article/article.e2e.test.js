'use strict';

const express = require(`express`);
const request = require(`supertest`);

const {HttpStatusCode} = require(`../../../constants`);
const article = require(`./article`).articleRouter;
const {ArticleService, CommentService} = require(`../../data-service`);

const mockData = require(`./article-mock-data.json`);


const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  article(app, new ArticleService(cloneData), new CommentService());
  return app;
};


describe(`API returns a list of all articles`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpStatusCode.OK));

  test(`Rerurns a list articles`, () => expect(response.body.length).toBe(5));

  test(`First articles id equal "stf99-"`, () => expect(response.body[0].id).toBe(`stf99-`));
});


describe(`API return an article whith given id`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/WM-I29`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpStatusCode.OK));

  test(
      `Article title is "Как достигнуть успеха не вставая с кресла"`,
      () => expect(response.body.title).toBe(`Как достигнуть успеха не вставая с кресла`)
  );
});


describe(`API creates an article if data is valid`, () => {

  const newArticle = {
    title: `Как собрать камни бесконечности`,
    announce: `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.`,
    fullText: `Он написал больше 30 хитов.`,
    createDate: `2020-11-06 09:51:04`,
    category: [
      `Кино`,
    ],
  };

  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles`)
      .send(newArticle);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpStatusCode.CREATED));

  test(`Return article created`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(
      `Articles count is changed`, () => request(app)
        .get(`/articles`)
        .expect((res) => expect(res.body.length).toBe(6))
  );
});


describe(`API refuses to create an offer if data is invalid`, () => {

  const newArticle = {
    title: `Как собрать камни бесконечности`,
    announce: `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.`,
    fullText: `Он написал больше 30 хитов.`,
    createDate: `2020-11-06 09:51:04`,
    category: [
      `Кино`,
    ],
  };

  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badArticle = {...newArticle};
      delete badArticle[key];
      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpStatusCode.BAD_REQUEST);
    }
  });
});


describe(`API changes existent article`, () => {

  const newArticle = 	{
    title: `Лучшие рок-музыканты 20-века`,
    announce: `Собрать камни бесконечности легко, если вы прирожденный герой. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
    fullText: `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
    createDate: `2020-11-17 23:24:55`,
    category: [
      `Музыка`,
      `Кино`,
      `IT`
    ],
  };

  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/articles/3GUT4i`)
      .send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpStatusCode.OK));

  test(`Return changed article`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(
      `Articles is really changed`,
      () => request(app)
        .get(`/articles/3GUT4i`)
        .expect((res) => expect(res.body.title).toBe(`Лучшие рок-музыканты 20-века`))
  );
});


test(`API return status code 404 when trying to change non-existen offer`, () => {

  const app = createAPI();

  const validArticle = {
    title: `Это`,
    announce: `валидный`,
    fullText: `объект`,
    createDate: `статья`,
    category: `однако 404`,
  };

  return request(app)
    .put(`/articles/NOEXIST`)
    .send(validArticle)
    .expect(HttpStatusCode.NOT_FOUND);
});


test(`API returns status code 400 when trying to change an article with invalid data`, () => {

  const app = createAPI();

  const validArticle = {
    title: `Это`,
    announce: `невалидный`,
    fullText: `объект`,
    category: `нет поля "createDate"`,
  };

  return request(app)
    .put(`/articles/3GUT4i`)
    .send(validArticle)
    .expect(HttpStatusCode.BAD_REQUEST);
});


describe(`API correctly deletes an article`, () => {

  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/yc2uCh`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpStatusCode.OK));

  test(`Return deleted article`, () => expect(response.body.id).toBe(`yc2uCh`));

  test(
      `Article count is 4 now`,
      () => request(app)
        .get(`/articles`)
        .expect((res) => expect(res.body.length).toBe(4))
  );
});


test(`API refuses to delete non-existen article`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/articles/NOEXIST`)
    .expect(HttpStatusCode.NOT_FOUND);
});


describe(`API creates a comment if data is valid`, () => {

  const newComment = {
    text: `Как собрать камни бесконечности`,
  };

  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles/Vyo7aO/comments`)
      .send(newComment);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpStatusCode.CREATED));

  test(`Return comment created`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));

  test(
      `Comments count 5 is changed`, () => request(app)
        .get(`/articles/Vyo7aO/comments`)
        .expect((res) => expect(res.body.length).toBe(5))
  );
});


test(`API refuses to create a comment when data is invalid, and returns status code 400`, () => {

  const app = createAPI();

  return request(app)
    .post(`/articles/3GUT4i/comments`)
    .send({})
    .expect(HttpStatusCode.BAD_REQUEST);
});


describe(`API correctly deletes a comment`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/Vyo7aO/comments/5H6ZWa`);
  });

  test(`Stetus code 200`, () => expect(response.statusCode).toBe(HttpStatusCode.OK));

  test(`Return comment deleted`, () => expect(response.body.id).toBe(`5H6ZWa`));

  test(`Comments count is 3 now`, () => request(app)
    .get(`/articles/Vyo7aO/comments`)
    .expect((res) => expect(res.body.length).toBe(3))
  );
});


test(`API refuses to delete non-existent comment`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/articles/Vyo7aO/comments/NOEXST`)
    .expect(HttpStatusCode.NOT_FOUND);
});


test(`API refuses to delete a comment to non-existent offer`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/articles/NOEXST/comments/5H6ZWa`)
    .expect(HttpStatusCode.NOT_FOUND);
});
