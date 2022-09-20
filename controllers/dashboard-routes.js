const router = require("express").Router();
const { Post, User, Textarea } = require("../models");
const withAuth = require("../utils/auth");
const sequelize = require("../config/connection");

router.get("/", withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            "id",
            "post_text",
            "title",
            "created_at"
        ],
        include: [
            {
                model: Textarea,
                attributes: ["id", "textarea_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            },
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render("dashboard", { posts, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// edit page
router.get("/edit/:id", withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User,
                attributes: ["username"]
            },
            {
                model: Textarea,
                attributes: ["id", "textarea_text", "post_id", "user_id","created_at"],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            }
        ]
    })
    .then(dbPostData => {
        const post = dbPostData.get({ plain: true });
        res.render("edit-posts", { post, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// new post
router.get("/newpost", (req, res) => {
    res.render("new-posts");
});

module.exports = router;