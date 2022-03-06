const express = require("express");
const api = express.Router();

const auth = require("./routes/auth");
const users = require("./routes/users");

api.use("/auth", auth);
api.use("/users", users);

module.exports = api;
