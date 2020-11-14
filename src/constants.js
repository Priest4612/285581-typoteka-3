'use strict';

const USER_ARGV_INDEX = 2;
const DEFAULT_COMMAND = `--help`;
const API_PREFIX = `/api`;
const MAX_ID_LENGTH = 6;

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

module.exports = {
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  API_PREFIX,
  MAX_ID_LENGTH,
  ExitCode,
  HttpStatusCode,
};
