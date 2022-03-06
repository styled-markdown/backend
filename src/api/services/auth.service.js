const User = require("../../models/User");

exports.checkUser = async (email) => {
  const user = await User.findOne({ email }).lean();
  return user;
};
