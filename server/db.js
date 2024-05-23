const { Sequelize } = require("sequelize");
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 20,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
});

const sequelize = new Sequelize(
  process.env.DB_NAME, //Название БД
  process.env.DB_USER, //Пользователь
  process.env.DB_PASSWORD, //Пароль
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  }
)

module.exports = {
  sequelize,
  pool
}