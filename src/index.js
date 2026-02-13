const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const { engine } = require("express-handlebars");

const app = express();
const port = process.env.PORT || 3000;

const route = require("./routes");
// STATIC FILES
app.use("/img", express.static(path.join(__dirname, "public/img")));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "src/public")));
// HTTP logger
app.use(morgan("combined"));

// TEMPLATE ENGINE
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
  }),
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/view"));

// ROUTE
route(app);

app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
