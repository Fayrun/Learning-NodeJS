// src/app/controllers/AuthController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");

class AuthController {
  // GET /auth/register
  showRegister(req, res) {
    res.render("auth/register");
  }

  // POST /auth/register
  async register(req, res) {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.render("auth/register", {
        error: "Mật khẩu xác nhận không khớp",
      });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.render("auth/register", { error: "Email đã được sử dụng" });
    }

    const hash = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hash });
    res.redirect("/auth/login");
  }

  // GET /auth/login
  showLogin(req, res) {
    res.render("auth/login");
  }

  // POST /auth/login
  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.render("auth/login", { error: "Sai email hoặc mật khẩu" });
    }
    req.session.user = { id: user._id, username: user.username };
    res.redirect("/");
  }

  // GET /auth/logout
  logout(req, res) {
    req.session.destroy();
    res.redirect("/auth/login");
  }
}

module.exports = new AuthController();
