const mongoose = require("mongoose");
async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/f8_education_dev");
    console.log("Connected to the database successfully!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

module.exports = {
  connectToDatabase,
};
