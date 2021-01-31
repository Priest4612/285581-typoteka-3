'use strict';

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const {initDB} = require(`../../lib/init-db`);
const category = require(`./category`).categoryRouter;
const DataService = require(`../../data-service`).CategoryService;

const {HttpStatusCode} = require(`../../../constants`);


const {roles, users, categories, articles} = require(`./category-mock-data`);

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
  category(app, new DataService(mockDB));
  return app;
};


describe(`API return category list`, () => {
  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpStatusCode.OK));

  test(`Return list of 9 categories`, () => expect(response.body.length).toBe(9));

  test(`Category names are "Журналы", "Игры", "Животные"`,
      () => expect(response.body.map((it) => it.name)).toEqual(
          expect.arrayContaining([
            `Музыка`,
            `Деревья`,
            `Разное`,
            `Кино`,
            `За жизнь`,
            `IT`,
            `Программирование`,
            `Без рамки`,
            `Железо`
          ])
      )
  );
});
