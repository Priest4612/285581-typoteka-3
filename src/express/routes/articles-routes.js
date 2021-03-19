'use strict';

const {Router} = require(`express`);
const multer = require(`multer`);
const {nanoid} = require(`nanoid`);
const {
  FrontDir: {UPLOAD_IMAGES_DIR},
  ARTICLES_PER_PAGE
} = require(`../../constants`);

const api = require(`../api`).getAPI();

// const {getLogger} = require(`../../service/lib/logger`);
// const logger = getLogger({name: `ARTICLES-ROUTER`});

const storage = multer.diskStorage({
  destination: UPLOAD_IMAGES_DIR,
  filename: (req, file, cb) => {
    const uniqeName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqeName}.${extension}`);
  }
});

const upload = multer({storage});

const articlesRouter = new Router();

articlesRouter.get(`/category/:id`, async (req, res, next) => {
  try {
    const {id} = req.params;
    let {page = 1} = req.query;
    page = +page;
    const limit = ARTICLES_PER_PAGE;
    const offset = (page - 1) * ARTICLES_PER_PAGE;
    const [
      {count, articlesIdByCategory},
      pugCategories,
    ] = await Promise.all([
      api.getArticlesByCategory({id, limit, offset}),
      api.getCategories({needCount: 1})
    ]);

    const activeCategory = pugCategories.find((category) => category.id === Number.parseInt(id, 10));

    const totalPages = Math.ceil(count / ARTICLES_PER_PAGE);

    res.render(`articles/articles-by-category`, {
      pugArticles: articlesIdByCategory,
      activeCategory,
      pugCategories,
      page,
      totalPages
    });
  } catch (err) {
    next(err);
  }
});


articlesRouter.get(`/edit/:id`, async (req, res, next) => {
  try {
    const {id} = req.params;
    const [apiArticleData, apiCategoriesData] = await Promise.all([
      api.getArticle(id),
      api.getCategories({needCount: 0})
    ]);
    await res.render(`articles/new-post`, {apiArticleData, apiCategoriesData});
  } catch (error) {
    next(error);
  }
});

articlesRouter.post(`/edit/:id`, upload.single(`upload`), async (req, res) => {
  const {id} = req.params.id;
  const {body, file} = req;

  const [apiCategoriesData] = await Promise.all([
    api.getCategories({needCount: 0})
  ]);

  const apiArticleData = {
    images: [{
      path: body.photo || file && file.filename
    }],
    title: body.title,
    announce: body[`announcement`],
    fullText: body[`full-text`],
    userId: 1,
  };

  if (body.categories) {
    let categories = [];
    body.categories.forEach((category) => {
      categories.push(apiCategoriesData.find((apiCategory) => apiCategory.name === category));
    });

    apiArticleData.categories = categories;
  }

  try {
    await api.editArticle(id, apiArticleData);
    res.redirect(`/my`);
  } catch (err) {
    res.render(`articles/new-post`, {
      apiArticleData,
      apiCategoriesData,
      validationErrors: err.response.data.message,
    });
  }
});

articlesRouter.get(`/add`, async (req, res) => {
  const apiCategoriesData = await api.getCategories({needCount: 0});
  res.render(`articles/new-post`, {apiCategoriesData});
});

articlesRouter.post(`/add`, upload.single(`upload`), async (req, res) => {
  const {body, file} = req;

  const [apiCategoriesData] = await Promise.all([
    api.getCategories({needCount: 0})
  ]);

  let categories = [];
  body.categories.forEach((category) => {
    categories.push(apiCategoriesData.find((apiCategory) => apiCategory.name === category));
  });

  const apiArticleData = {
    images: [{
      path: body.photo || file && file.filename
    }],
    categories,
    title: body[`title`],
    announce: body[`announcement`],
    fullText: body[`full-text`],
    userId: 1,
  };

  try {
    await api.createArticle(apiArticleData);
    res.redirect(`/my`);
  } catch (err) {
    res.render(`articles/new-post`, {
      apiArticleData,
      apiCategoriesData,
      validationErrors: err.response.data.message,
    });
  }
});

articlesRouter.get(`/:id`, async (req, res, next) => {
  try {
    const {id} = req.params;
    const [
      pugArticle,
      categories,
    ] = await Promise.all([
      api.getArticle(id),
      api.getCategories({needCount: 1}),
    ]);

    const categoryById = categories.reduce((acc, category) => ({
      [category.id]: category,
      ...acc
    }), {});

    const pugCategories = pugArticle.categories.map((item) => {
      const category = categoryById[item.id];
      return category;
    });

    res.render(`articles/post`, {pugArticle, pugCategories});
  } catch (err) {
    next(err);
  }
});


module.exports = {
  articlesRouter,
};
