const router = require("express").Router();

const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const textareaRoutes = require("./text-area");
const { Post } = require("../../models");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/textarea", textareaRoutes);
module.exports = router;