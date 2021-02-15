'use strict';

const resolvePath = require(`path`).resolve;
const {PROJECT_DIR} = require(`../settings`);

const USER_ARGV_INDEX = 2;
const DEFAULT_COMMAND = `--help`;
const MAX_ID_LENGTH = 6;

const ARTICLES_PER_PAGE = 8;

const ExitCode = {
  SUCCESS: 0,
  ERROR: 1,
};

const HttpStatusCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`,
};


const DATA_PATH = resolvePath(PROJECT_DIR, `data`);

const DataFilePath = {
  SENTENCES: resolvePath(DATA_PATH, `sentences.txt`),
  TITLES: resolvePath(DATA_PATH, `titles.txt`),
  CATEGORIES: resolvePath(DATA_PATH, `categories.txt`),
  COMMENTS: resolvePath(DATA_PATH, `comments.txt`),
  USER_ROLES: resolvePath(DATA_PATH, `user-role.txt`),
  ITEM_IMG: resolvePath(DATA_PATH, `item-img.txt`),
};

const GenerateFileRequirements = {
  DEFAULT_ARTICLES_COUNT: 1,
  MAX_ARTICLES_COUNT: 1000,
  MAX_ARTICLES_MESSAGE: `Не больше 1000 объявлений`,
  MONTH_INTERVAL: 3,
  MAX_COMMENTS: 15,
  MAX_USERS: 5,
  MIN_ANNOUNCE_STRING: 1,
  MAX_ANNOUNCE_STRING: 2,
};

const API_PREFIX = `/api`;

const EXPRESS_PATH = resolvePath(PROJECT_DIR, `src/express`);

const FrontDir = {
  PUBLIC_DIR: resolvePath(EXPRESS_PATH, `public`),
  TEMPLATES_DIR: resolvePath(EXPRESS_PATH, `templates`),
  UPLOAD_DIR: resolvePath(EXPRESS_PATH, `upload`),
  UPLOAD_IMAGES_DIR: resolvePath(EXPRESS_PATH, `upload`, `img`),
};


module.exports = {
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  API_PREFIX,
  MAX_ID_LENGTH,
  ExitCode,
  HttpStatusCode,
  Env,
  DataFilePath,
  GenerateFileRequirements,
  FrontDir,
  ARTICLES_PER_PAGE
};
