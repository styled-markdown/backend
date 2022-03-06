const mongoose = require("mongoose");
const { Schema } = mongoose;
const { isEmail } = require("validator");

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: isEmail,
      message: "이메일 형식이 틀렸습니다.",
    },
  },
  userName: String,
  docs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Docs",
    },
  ],
  token: String,
});

module.exports = mongoose.model("User", UserSchema);
