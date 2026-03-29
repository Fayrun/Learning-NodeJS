const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const { engine } = require("express-handlebars");
const session = require("express-session"); // ← THÊM

const app = express();
const port = process.env.PORT || 3000;

const route = require("./routes");
const db = require("./config/db");
db.connectToDatabase();

// STATIC FILES
app.use("/img", express.static(path.join(__dirname, "public/img")));
app.use(express.static(path.join(__dirname, "public"))); // ← bỏ "src/" đi

// HTTP logger
app.use(morgan("combined"));

// BODY PARSER
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// SESSION ← phải đặt trước setCurrentUser
app.use(
  session({
    secret: "your_secret_key", // đổi thành string bất kỳ, nên dùng env
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 7 ngày
  }),
);

// SET CURRENT USER ← sau session
const { setCurrentUser } = require("./app/middlewares/authMiddleware");
app.use(setCurrentUser);

// TEMPLATE ENGINE
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      json: (context) => JSON.stringify(context),
      eq: (a, b) => a === b,
      formatDate: (date) => {
        if (!date) return "";
        return new Date(date).toLocaleDateString("vi-VN");
      },
    },
  }),
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/view"));

app.use(cors());

// ROUTE
route(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
