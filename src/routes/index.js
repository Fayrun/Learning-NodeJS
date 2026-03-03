const newsRouter = require("./NewsRoute");
const coursesRouter = require("./CoursesRoute");
const siteRouter = require("./SiteRoute");
const authRouter = require("./AuthRoute"); // ← thêm
const userRouter = require("./UserRoute");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
console.log("MongoStore:", MongoStore); // ← thêm dòng này

function route(app) {
  app.use(
    session({
      secret: "your-secret-key",
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({
        mongoUrl: "mongodb://localhost:27017/f8_education_dev",
      }),
      cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
    }),
  );

  app.use((req, res, next) => {
    res.locals.currentUser = req.session.user;
    next();
  });

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

  app.use("/auth", authRouter); // ← thêm
  app.use("/news", newsRouter);
  app.use("/courses", coursesRouter);
  app.use("/", siteRouter);
  app.use("/user", userRouter);
}

module.exports = route;
