const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 255 },
    description: { type: String, required: true },
    image: { type: String, required: true },
    videoId: { type: String, required: true, maxlength: 20 },
    slug: { type: String, unique: true },
    numberOfEpisodes: { type: Number, required: true, min: 1 },
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

    // ← THÊM MỚI
    status: {
      type: String,
      required: true,
      enum: ["Đang chiếu", "Hoàn thành", "Sắp chiếu"],
      default: "Đang chiếu",
    },
    country: { type: String, required: true, maxlength: 100 },
    studio: { type: String, required: true, maxlength: 255 },
    duration: { type: Number, required: true, min: 1 }, // phút/tập
    warning: {
      type: String,
      enum: ["None", "R18+"],
      default: "None",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Course", courseSchema);
