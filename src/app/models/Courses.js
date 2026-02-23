const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: { type: String, required: true, maxlength: 255 },
  description: { type: String, required: true, maxlength: 600 },
  image: { type: String, required: true, maxlength: 255 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  videoUrl: { type: String, required: true, maxlength: 255 },
  slug: { type: String, required: true, maxlength: 255, unique: true },
});
module.exports = mongoose.model("Course", courseSchema);
