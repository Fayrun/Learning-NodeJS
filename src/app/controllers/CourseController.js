const Course = require("../models/Courses");
class CourseController {
  // Get single course
  async show(req, res) {
    try {
      const course = await Course.findOne({ slug: req.params.slug });
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.render("courses/show", { course: course.toObject() });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async create(req, res) {
    res.render("courses/create");
  }
}

module.exports = new CourseController();
