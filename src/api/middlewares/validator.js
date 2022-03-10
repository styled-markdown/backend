const { isEmail } = require("validator");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

exports.verifyEmail = (req, res, next) => {
  const userEmail = req.body.email;

  if (!userEmail || !isEmail(userEmail)) {
    res.status(400);
    return res.json({
      result: "error",
      error: "이메일 형식이 틀렸습니다.",
    });
  }

  if (isEmail(userEmail)) {
    next();
  }
};

exports.verifyAccessToken = (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    const error = new Error("Invalid AccessToken");
    return next(error);
  }

  const decoded = jwt.verify(
    accessToken,
    process.env.TOKEN_SECRET_KEY,
    (error, decode) => {
      if (error) {
        return null;
      }

      return decode.email;
    }
  );

  if (!decoded) {
    const error = new Error("Invalid AccessToken");
    return next(error);
  }

  res.locals.user = decoded;
  next();
};

exports.verifyParams = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400);
    return res.json({
      result: "error",
      message: "Invalid Id",
    });
  }

  next();
};
