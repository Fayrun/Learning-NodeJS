const newsRouter = require("./NewsRoute");
const siteRouter = require("./SiteRoute");
function route(app) {
  app.use("/news", newsRouter);
  app.use("/", siteRouter);
}

module.exports = route;
