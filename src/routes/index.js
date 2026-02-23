const newsRouter = require("./NewsRoute");
const coursesRouter = require("./CoursesRoute");
const siteRouter = require("./SiteRoute");
function route(app) {
  app.use("/news", newsRouter);
  app.use("/courses", coursesRouter);
  app.use("/", siteRouter);
}

module.exports = route;
