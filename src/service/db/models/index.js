'use strict';

const fs = require(`fs`);
const path = require(`path`);
const Sequelize = require(`sequelize`);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || `development`;
const config = require(__dirname + `/../../../../config/database.js`)[env];
const db = {};


const {username, password, database, host, port, dialect} = config;

const somethingIsNotDefined = [
  username, password, database, host, port, dialect
].some((it) => it === undefined);

if (somethingIsNotDefined) {
  throw new Error(`One or more environmental variables are not defined`);
}


const sequelize = new Sequelize(
    database, username, password, {
      host,
      port,
      dialect,
      pool: {
        max: 5,
        min: 0,
        acquire: 10000,
        idle: 1000,
      },
    }
);


fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf(`.`) !== 0) && (file !== basename) && (file.slice(-3) === `.js`);
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });


Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
