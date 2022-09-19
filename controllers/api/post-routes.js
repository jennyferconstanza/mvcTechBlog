const router = require("express").Router();
const { Post, User } = require("../../models");
const withAuth = require("../../utils/auth");
const sequelize = require("../../config/connection");

// get posts
router.get("/", (req,res) => {
    Post.findAll({
        attributes: [
            "id",
            "post_text",
            "title",
            "created_at"
        ],
        order:[["created_at"]],
        include: [
            {
                model: textarea
            }
        ]
    })
})