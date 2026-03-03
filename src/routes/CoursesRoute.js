const express = require("express");
const router = express.Router();
const { requireLogin } = require("../app/middlewares/authMiddleware");
const courseController = require("../app/controllers/CourseController");

router.get("/", courseController.index);
router.get("/list", courseController.list);
router.get("/search", courseController.search);
router.get("/create", requireLogin, courseController.create); // ← chỉ giữ cái có requireLogin
router.post("/store", requireLogin, courseController.store);
router.get("/:id/edit", requireLogin, courseController.edit); // ← chỉ giữ cái có requireLogin
router.put("/:id/update", requireLogin, courseController.update);
router.delete("/:id/delete", requireLogin, courseController.destroy);
router.get("/:slug", courseController.show);

module.exports = router;
