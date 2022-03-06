const jwt = require("jsonwebtoken");
const authService = require("../services/auth.service");

exports.login = async (req, res, next) => {
  const userEmail = req.body.email;

  try {
    const user = await authService.checkUser(userEmail);

    if (user) {
      const accessToken = jwt.sign(
        { email: userEmail },
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: "1h" }
      );
      return res.json({
        result: "ok",
        accessToken,
      });
    }

    res.status(401);
    return res.json({
      result: "failure",
      error: "Unregistered user",
    });
  } catch (error) {
    next(error);
  }
};
