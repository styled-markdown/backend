const express = require("express");
const api = express.Router();

const auth = require("./routes/auth");
const users = require("./routes/users");
const docs = require("./routes/docs");

api.use("/auth", auth);
api.use("/users", users);
api.use("/docs", docs);

module.exports = api;
