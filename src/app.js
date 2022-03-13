require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");

const mongoose = require("mongoose");
mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", console.log.bind(console, "Connected to database.."));

const indexRouter = require("./indexRouter");
const api = require("./api");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: process.env.URL,
    credentials: true,
    methods: "GET, POST, DELETE, PUT",
  })
);

app.use("/", indexRouter);
app.use("/api", api);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json("Internal Error");
});

module.exports = app;
