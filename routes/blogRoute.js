const express = require("express");
const router = express.Router();
const blogCtrl = require("../controllers/blog-ctrl");
const auth = require("../middleware/auth");

// auth.isAdmin

router.post("/add-blog-post", blogCtrl.addBlogPost);
router.get("/get-blog-post/:id", blogCtrl.getBlogPostById);
router.post("/edit-blog-post/:id", blogCtrl.editBlogPostById);
router.get("/getall", blogCtrl.getAll);

module.exports = router;
