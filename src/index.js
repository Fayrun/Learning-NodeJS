const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const cors = require("cors");

const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.use("/img", express.static(path.join(__dirname, "public/img")));

//HTTP logger
app.use(morgan("combined"));

//template engine
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/resources/view");
app.get("/", (req, res) => {
  res.render("news");
});
app.use(cors());
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
