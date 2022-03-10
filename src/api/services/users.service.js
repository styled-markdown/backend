const User = require("../../models/User");

exports.isUserUnique = async (userData) => {
  const { email } = userData;
  const user = await User.findOne({ email }).lean();

  return !user;
};

exports.createUser = async (userData) => {
  const { email, displayName } = userData;

  await User.create({
    email,
    userName: displayName,
    docs: [],
  });
};

exports.findUser = async (email) => {
  const user = await User.findOne({ email }, "_id").lean();
  return user ? user : null;
};

exports.getUserDocs = async (email) => {
  const { docs } = await User.findOne({ email }, "docs")
    .lean()
    .populate("docs", "-body -createdBy -__v");
  return docs;
};
