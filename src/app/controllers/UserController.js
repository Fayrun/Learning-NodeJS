// src/app/controllers/UserController.js
const User = require("../models/User");
const Course = require("../models/Courses");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "src/public/uploads/avatars/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

class UserController {
  // GET /user/profile
  async showProfile(req, res) {
    const user = await User.findById(req.session.user.id);
    res.render("user/profile", { user: user.toObject() });
  }

  // POST /user/profile
  async updateProfile(req, res) {
    try {
      const { fullName, gender, password } = req.body;
      const updateData = { fullName, gender };

      if (password && password.trim() !== "") {
        updateData.password = await bcrypt.hash(password, 10);
      }
      if (req.file) {
        updateData.avatar = "/uploads/avatars/" + req.file.filename;
      }

      const user = await User.findByIdAndUpdate(
        req.session.user.id,
        updateData,
        { new: true },
      );
      req.session.user.avatar = updateData.avatar || req.session.user.avatar;
      res.render("user/profile", {
        user: user.toObject(),
        success: "Cập nhật thành công!",
      });
      req.session.user.username = user.username;
      res.redirect("/user/profile");
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // GET /user/watchlist
  async watchlist(req, res) {
    const user = await User.findById(req.session.user.id).populate("following");
    res.render("user/watchlist", {
      courses: user.following.map((c) => c.toObject()),
    });
  }

  // POST /courses/:id/follow
  async follow(req, res) {
    const userId = req.session.user.id;
    const courseId = req.params.id;
    const user = await User.findById(userId);
    const isFollowing = user.following.includes(courseId);

    if (isFollowing) {
      await User.findByIdAndUpdate(userId, { $pull: { following: courseId } });
    } else {
      await User.findByIdAndUpdate(userId, {
        $addToSet: { following: courseId },
      });
    }
    res.json({ following: !isFollowing });
  }
}

module.exports = new UserController();
