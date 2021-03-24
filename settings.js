'use strict';

const path = require(`path`);

module.exports = {
  PROJECT_DIR: __dirname,
  DEFAULT_PORT_FRONT: 8080,
  DEFAULT_PORT_API: 3000,
  SERVICE_FOLDER: path.resolve(__dirname, `src`, `service`),
  EXPRESS_FOLDER: path.resolve(__dirname, `src`, `express`)
};
