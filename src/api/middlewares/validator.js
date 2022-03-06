const { isEmail } = require("validator");

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
