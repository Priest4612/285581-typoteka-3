'use strict';

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const {initDB} = require(`../../lib/init-db`);
const article = require(`./article`).articleRouter;
const {ArticleService, CommentService} = require(`../../data-service`);

const {HttpStatusCode} = require(`../../../constants`);

const {roles, users, categories, articles} = require(`./article-mock-data`);

const createAPI = async () => {
  const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
  await initDB(mockDB, {data: {
    roles,
    users,
    categories,
    articles,
  }});
  const app = express();
  app.use(express.json());
  article(app, new ArticleService(mockDB), new CommentService(mockDB));
  return app;
};


describe(`API returns a list of all articles`, () => {

  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
      .get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpStatusCode.OK));

  test(`Rerurns a list articles`, () => expect(response.body.length).toBe(5));

  test(`First articles id equal "Что такое золотое сечение"`, () => expect(response.body[0].title).toBe(`Что такое золотое сечение`));
});


describe(`API return an article whith given id`, () => {

  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
      .get(`/articles/2`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpStatusCode.OK));

  test(
      `Article title is "Как перестать беспокоиться и начать жить"`,
      () => expect(response.body.title).toBe(`Как перестать беспокоиться и начать жить`)
  );
});


describe(`API creates an article if data is valid`, () => {

  const newArticle = {
    title: `Как собрать камни бесконечности`,
    announce: `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.`,
    fullText: `Он написал больше 30 хитов.`,
    category: [1, 2],
    userId: 3,
    images: {
      path: `/img/forest@1x.jpg`
    },
  };

  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .post(`/articles`)
      .send(newArticle);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpStatusCode.CREATED));

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
    category: [1, 2],
    images: {
      path: `/img/forest@1x.jpg`
    },
  };

  let app;

  beforeAll(async () => {
    app = await createAPI();
  });

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

  const newArticle = {
    title: `Как собрать камни бесконечности`,
    announce: `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.`,
    fullText: `Он написал больше 30 хитов.`,
    category: [1, 2],
    userId: 3,
    images: {
      path: `/img/forest@1x.jpg`
    },
  };

  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .put(`/articles/3`)
      .send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpStatusCode.OK));

  test(
      `Articles is really changed`,
      () => request(app)
        .get(`/articles/3`)
        .expect((res) => expect(res.body.title).toBe(`Как собрать камни бесконечности`))
  );
});


test(`API return status code 404 when trying to change non-existent article`, async () => {

  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
    .put(`/articles/20`)
    .send(validArticle);
  });

  const validArticle = {
    title: `Как собрать камни бесконечности`,
    announce: `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.`,
    fullText: `Он написал больше 30 хитов.`,
    category: [1, 2],
    userId: 3,
    images: {
      path: `/img/forest@1x.jpg`
    },
  };

  return () => expect(response.statusCode).toBe(HttpStatusCode.NOT_FOUND);
});


test(`API returns status code 400 when trying to change an article with invalid data`, async () => {

  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = request(app)
    .put(`/articles/20`)
    .send(invalidArticle);
  });

  const invalidArticle = {
    title: `Как собрать камни бесконечности`,
    announce: `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.`,
    fullText: `Он написал больше 30 хитов.`,
    category: [1, 2],
    images: {
      path: `/img/forest@1x.jpg`
    },
  };

  return () => expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
});


describe(`API correctly deletes an article`, () => {

  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .delete(`/articles/1`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpStatusCode.OK));

  test(`Article count is 4 now`, async () => await request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(4))
  );
});


test(`API refuses to delete non-existen article`, async () => {

  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .delete(`/articles/20`);
  });

  return () => expect(response.statusCode).toBe(HttpStatusCode.NOT_FOUND);
});


describe(`API returns a list of comments to given offer`, () => {

  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
    .get(`/articles/2/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpStatusCode.OK));

  test(`Returns list of 7 comments`, () => expect(response.body.length).toBe(7));

  test(`First comment's text is "Давно не пользуюсь стационарными компьютерами. Ноутбуки победили., Мне не нравится ваш стиль. Ощущение, что вы меня поучаете., Согласен с автором!,"`,
      () => expect(response.body[0].text).toBe(`Давно не пользуюсь стационарными компьютерами. Ноутбуки победили., Мне не нравится ваш стиль. Ощущение, что вы меня поучаете., Согласен с автором!,`));

});


describe(`API creates a comment if data is valid`, () => {

  const newComment = {
    text: `Как собрать камни бесконечности`,
  };

  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .post(`/articles/3/comments`)
      .send(newComment);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpStatusCode.CREATED));

  test(`Return comment created`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));

  test(`Comments count 2 is changed`, async () => {
    beforeAll(async () => {
      response = await request(app).get(`/articles/3/comments`);
    });
    return () => expect(response.body.length).toBe(2);
  });
});


test(`API refuses to create a comment when data is invalid, and returns status code 400`, async () => {

  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .post(`/articles/12/comments`)
      .send({});
  });

  return () => expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
});


describe(`API correctly deletes a comment`, () => {

  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .delete(`/articles/1/comments/1`);
  });

  test(`Stetus code 200`, () => expect(response.statusCode).toBe(HttpStatusCode.OK));

  test(`Comments count is 10 now`, () => request(app)
    .get(`/articles/1/comments`)
    .expect((res) => expect(res.body.length).toBe(10))
  );
});


test(`API refuses to delete non-existent comment`, async () => {

  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
    .delete(`/articles/1/comments/15`);
  });

  return () => expect(response.statusCode).toBe(HttpStatusCode.NOT_FOUND);
});


test(`API refuses to delete a comment to non-existent offer`, async () => {

  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .delete(`/articles/15/comments/23`);
  });

  return () => expect(response.statusCode).toBe(HttpStatusCode.NOT_FOUND);
});
