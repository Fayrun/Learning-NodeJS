const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 255 },
    description: { type: String, required: true, maxlength: 600 },
    image: { type: String, required: true },
    videoId: { type: String, required: true, maxlength: 20 },
    slug: { type: String, unique: true },
    numberOfEpisodes: {
      type: Number,
      required: true,
      min: 1,
    },
    Genre: {
      type: [String],
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
    releaseYear: {
      type: Number,
      required: true,
      min: 1900,
      max: new Date().getFullYear(),
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Course", courseSchema);
