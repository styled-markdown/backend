const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controllers");
const validator = require("../middlewares/validator");

router.post("/", validator.verifyEmail, usersController.join);
router.get("/docs", validator.verifyAccessToken, usersController.getDocs);

module.exports = router;
