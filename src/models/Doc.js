const mongoose = require("mongoose");
const { Schema } = mongoose;

const DocSchema = new Schema(
  {
    title: {
      type: String,
      default: "README.md",
    },
    body: {
      type: String,
      default: "",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doc", DocSchema);
