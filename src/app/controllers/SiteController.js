const Course = require("../models/Courses");

class SiteController {
  // Cách viết Promise với async/await + lean (lưu ý chỉ sử dụng lean nếu chỉ truy vấn query load data,ko tương tác ghi đè dữ liệu)
  async index(req, res) {
    try {
      const courses = await Course.find({}).lean(); // trả về plain object
      res.render("home", { courses });
    } catch (err) {
      res.status(400).json({ error: "Error!" });
    }
  }

  search(req, res) {
    res.render("search");
    console.log("Controller search gọi");
  }
}

module.exports = new SiteController();
