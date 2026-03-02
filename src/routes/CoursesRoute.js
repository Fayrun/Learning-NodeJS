const express = require("express");
const router = express.Router();
const courseController = require("../app/controllers/CourseController");

router.get("/", courseController.index);
router.get("/create", courseController.create);
router.get("/list", courseController.list);
router.get("/search", courseController.search); // ← phải trước /:slug
router.post("/store", courseController.store);
router.get("/:id/edit", courseController.edit);
router.put("/:id/update", courseController.update);
router.delete("/:id/delete", courseController.destroy);
router.get("/:slug", courseController.show); // ← phải ở cuối

module.exports = router;
