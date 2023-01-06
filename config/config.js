require('dotenv').config();

module.exports = {
  local: {
    dialect: process.env.DB_DIALECT,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  },
  development: {
    dialect: process.env.DB_DIALECT,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  },
  production: {
    dialect: process.env.DB_DIALECT,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  },
  parameters: {
    server: {
    },
  }

};
