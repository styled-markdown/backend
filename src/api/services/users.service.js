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
