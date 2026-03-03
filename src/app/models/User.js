// src/app/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, default: "" },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "male",
    },
    avatar: { type: String, default: "" },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
