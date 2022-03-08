const usersService = require("../services/users.service");
const docsService = require("../services/docs.service");

exports.createDoc = async (req, res, next) => {
  const userEmail = res.locals.user;
  const { title } = req.body;

  try {
    const userId = await usersService.findUser(userEmail);

    if (!userId) {
      return res.json({
        result: "error",
        error: "Invalid User",
      });
    }

    const createdBy = userId._id;
    const docsId = await docsService.createDoc({ title, createdBy });

    res.json({
      result: "ok",
      docsId,
    });
  } catch (error) {
    next(error);
  }
};

exports.getDetail = async (req, res, next) => {
  const userEmail = res.locals.user;
  const docId = req.params.id;

  try {
    const { body, createdBy } = await docsService.getDocDetail(docId);

    if (createdBy.email === userEmail) {
      return res.json({
        result: "ok",
        body,
      });
    }

    res.json({
      result: "error",
      error: "Unauthorized User",
    });
  } catch (error) {
    next(error);
  }
};
