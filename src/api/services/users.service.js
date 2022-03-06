const User = require("../../models/User");

exports.isUserUnique = async (userData) => {
  const { email } = userData;
  const user = await User.findOne({ email }).lean();

  return !user;
};

exports.createUser = async (userData) => {
  const { email, displayedName } = userData;

  await User.create({
    email,
    userName: displayedName,
    docs: [],
  });
};
