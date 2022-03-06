const express = require("express");
const api = express.Router();

const auth = require("./routes/auth");

api.use("/auth", auth);

module.exports = api;
