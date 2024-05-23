require("dotenv").config();

const express = require("express");
const { sequelize, pool }= require("./db");
const models = require("./models/models");
const cors = require("cors");// позволяет контролировать доступ к ресурсам сервера с других доменов
const fileUpload = require("express-fileupload");
const router = require("./routes/router");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const path = require("path");
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);


const PORT = process.env.PORT || 5000;

const app = express();

app.use(session({
  store: new PgSession({
    pool: pool,
    tableName: "session"
  }),
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 дней
}))


app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, "static")));
app.use("/api", router);

//Обработка ошибок, последний Middleware
app.use(errorHandler);


const start = async () => {
  try {
    await sequelize.authenticate();// с помощью нее будет устанавливать подключение к базе данных
    await sequelize.sync();// сверяет БД со схемой данный, которые мы описали
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
