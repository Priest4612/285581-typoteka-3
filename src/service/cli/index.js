'use strict';

const help = require(`./help`);
const generate = require(`./generate`);
const version = require(`./version`);
const server = require(`./server`);
const initDb = require(`./init-db`);
const fillDb = require(`./fill-db`);

const Cli = {
  [generate.name]: generate,
  [help.name]: help,
  [version.name]: version,
  [server.name]: server,
  [initDb.name]: initDb,
  [fillDb.name]: fillDb,
};

module.exports = {
  Cli,
};
