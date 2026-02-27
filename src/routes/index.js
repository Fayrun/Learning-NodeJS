const newsRouter = require("./NewsRoute");
const coursesRouter = require("./CoursesRoute");
const siteRouter = require("./SiteRoute");

function route(app) {
  // Thêm vào trước route(app) trong index.js
  app.use((req, res, next) => {
    res.locals.genres = [
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
    ];
    next();
  });
  app.use("/news", newsRouter);
  app.use("/courses", coursesRouter);
  app.use("/", siteRouter);
}

module.exports = route;
