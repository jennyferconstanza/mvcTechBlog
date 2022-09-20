const router = require("express").Router();
const { Post, User, Textarea } = require("../../models");
const withAuth = require("../../utils/auth");
const sequelize = require("../../config/connection");

// get posts
router.get("/", (req, res) => {
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
                model: Textarea,
                attributes: ["id", "textarea_text","post_id","user_id","created_at"],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            },
            {
                model: User,
                attributes: ["username"]
            },
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get single post by id 
