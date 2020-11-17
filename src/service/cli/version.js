'use strict';

const packageJsonFile = require(`../../../package.json`);

const {getLogger} = require(`../lib/logger`);
const logger = getLogger({name: `VERSION`});

module.exports = {
  name: `--version`,
  run() {
    const version = packageJsonFile.version;
    logger.info(version);
  }
};
