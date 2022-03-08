const express = require("express");
const router = express.Router();

const validator = require("../middlewares/validator");
const docsController = require("../controllers/docs.controllers");

router.post("/", validator.verifyAccessToken, docsController.createDoc);
router.get(
  "/:id",
  validator.verifyAccessToken,
  validator.verifyParams,
  docsController.getDetail
);

module.exports = router;
