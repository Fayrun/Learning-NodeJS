const Course = require("../models/Courses");
class CourseController {
  // [GET] /courses/:slug
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
  //[GET] /courses/create
  async create(req, res, next) {
    res.render("courses/create");
  }
  //[POST] /courses
  async store(req, res, next) {
    try {
      const course = new Course(req.body);
      await course.save();
      res.redirect("/me/stored/courses");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CourseController();
