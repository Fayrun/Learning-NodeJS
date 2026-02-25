const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 255 },
    description: { type: String, required: true, maxlength: 600 },
    image: { type: String, required: true },
    videoId: { type: String, required: true, maxlength: 20 },
    slug: { type: String, unique: true },
    Genre: {
      type: String,
      required: true,
      enum: [
        "Action",
        "Shounen",
        "Romance",
        "Mecha",
        "Isekai",
        "Harem",
        "Adventure",
        "School",
        "Slice of life",
        "Horror",
      ],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Course", courseSchema);
