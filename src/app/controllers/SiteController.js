class SiteController {
  index(req, res) {
    res.render("home");
  }
  search(req, res) {
    res.render("search");
    console.log("Controller search gọi");
  }
}

module.exports = new SiteController();
