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
  // [GET] /courses
  async index(req, res) {
    try {
      var filter = {};

      if (req.query.year) {
        if (req.query.year === "before2018") {
          filter.releaseYear = { $lt: 2018 };
        } else {
          filter.releaseYear = parseInt(req.query.year);
        }
      }

      if (req.query.genre) {
        filter.Genre = req.query.genre;
      }

      const courses = await Course.find(filter);
      res.render("courses/index", {
        courses: courses.map((c) => c.toObject()),
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async list(req, res) {
    try {
      var filter = {};

      if (req.query.year) {
        if (req.query.year === "before2018") {
          filter.releaseYear = { $lt: 2018 };
        } else {
          filter.releaseYear = parseInt(req.query.year);
        }
      }

      if (req.query.genre) {
        filter.Genre = req.query.genre;
      }

      const courses = await Course.find(filter);
      res.render("courses/list", {
        courses: courses.map((c) => c.toObject()),
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
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
  // [GET] /courses/:id/edit
  async edit(req, res) {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) return res.status(404).json({ error: "Not found" });
      res.render("courses/edit", { course: course.toObject() });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // [PUT] /courses/:id
  async update(req, res) {
    try {
      await Course.findByIdAndUpdate(req.params.id, req.body);
      res.json({ message: "Success" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // [DELETE] /courses/:id
  async destroy(req, res) {
    try {
      await Course.findByIdAndDelete(req.params.id);
      res.json({ message: "Success" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async search(req, res) {
    try {
      const q = req.query.q || "";
      const courses = await Course.find({
        name: { $regex: q, $options: "i" },
      });
      res.render("courses/index", {
        courses: courses.map((c) => c.toObject()),
        searchQuery: q,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CourseController();
