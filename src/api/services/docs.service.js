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
