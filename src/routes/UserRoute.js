// src/routes/UserRoute.js
const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/UserController");
const { requireLogin } = require("../app/middlewares/authMiddleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "src/public/uploads/avatars/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.get("/profile", requireLogin, userController.showProfile);
router.post(
  "/profile",
  requireLogin,
  upload.single("avatar"),
  userController.updateProfile,
);
router.get("/watchlist", requireLogin, userController.watchlist);

module.exports = router;
