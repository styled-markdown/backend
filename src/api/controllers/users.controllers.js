const usersService = require("../services/users.service");

exports.join = async (req, res, next) => {
  try {
    const isUnique = await usersService.isUserUnique(req.body);

    if (!isUnique) {
      res.status(400);
      return res.json({
        result: "error",
        error: "이미 등록된 이메일입니다.",
      });
    }

    await usersService.createUser(req.body);

    res.json({
      result: "ok",
    });
  } catch (error) {
    next(error);
  }
};

exports.getDocs = async (req, res, next) => {
  try {
    const docs = await usersService.getUserDocs(res.locals.user);
    res.json({
      result: "ok",
      docs: docs,
    });
  } catch (error) {
    next(error);
  }
};
