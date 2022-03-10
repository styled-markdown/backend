const usersService = require("../services/users.service");
const docsService = require("../services/docs.service");

exports.createDoc = async (req, res, next) => {
  const userEmail = res.locals.user;
  const { title } = req.body;

  try {
    const userId = await usersService.findUser(userEmail);

    if (!userId) {
      res.status(401);
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
    const result = await docsService.getDocDetail(docId);

    if (!result) {
      res.status(404);
      return res.json({
        result: "error",
        error: "No such document",
      });
    }

    const { body, createdBy } = result;

    if (createdBy.email === userEmail) {
      return res.json({
        result: "ok",
        body,
      });
    }

    res.status(401);
    res.json({
      result: "error",
      error: "Unauthorized User",
    });
  } catch (error) {
    next(error);
  }
};

exports.saveDoc = async (req, res, next) => {
  const userEmail = res.locals.user;
  const docId = req.params.id;
  const { body } = req.body;
  const summary = body?.slice(0, 500);

  try {
    const result = await docsService.getDocDetail(docId);

    if (!result) {
      res.status(404);
      return res.json({
        result: "error",
        error: "No such document",
      });
    }

    if (result.createdBy.email === userEmail) {
      await docsService.saveDoc({ id: docId, body, summary });
      return res.json({
        result: "ok",
      });
    }

    res.status(401);
    res.json({
      result: "error",
      error: "Unauthorized User",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteDoc = async (req, res, next) => {
  const userEmail = res.locals.user;
  const docId = req.params.id;

  try {
    const result = await docsService.getDocDetail(docId);

    if (!result) {
      res.status(404);
      return res.json({
        result: "error",
        error: "No such document",
      });
    }

    if (result.createdBy.email === userEmail) {
      await docsService.deleteDoc({ email: userEmail, id: docId });
      return res.json({
        result: "ok",
      });
    }

    res.status(401);
    res.json({
      result: "error",
      error: "Unauthorized User",
    });
  } catch (error) {
    next(error);
  }
};
