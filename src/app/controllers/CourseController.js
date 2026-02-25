const Course = require("../models/Courses");

function generateSlug(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
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
  async store(req, res) {
    try {
      const slug = generateSlug(req.body.name);
      const course = new Course({ ...req.body, slug });
      await course.save();
      res.json({ message: "Success" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new CourseController();
