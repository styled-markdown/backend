const Doc = require("../../models/Doc");
const User = require("../../models/User");

exports.createDoc = async ({ title, createdBy }) => {
  const result = await Doc.create({ title, createdBy });
  await User.findByIdAndUpdate(createdBy, {
    $push: {
      docs: result._id,
    },
  });

  return result._id;
};

exports.getDocDetail = async (id) => {
  const result = await Doc.findById(id, "body createdBy -_id")
    .lean()
    .populate("createdBy", "email -_id");
  return result;
};

exports.saveDoc = async ({ id, body, summary }) => {
  await Doc.findByIdAndUpdate(id, { body, summary });
};
