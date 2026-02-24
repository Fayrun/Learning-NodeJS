const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 255 },
    description: { type: String, required: true, maxlength: 600 },
    image: { type: String, required: true, maxlength: 255 },
    videoId: { type: String, required: true, maxlength: 20 },
    slug: { type: String, required: true, maxlength: 255, unique: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Course", courseSchema);
