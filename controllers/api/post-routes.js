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
router.get("/:id", (req, res) => {
    Post.fineOne({
        where: {
            id: req.params.id
        },
        attributes: [
            "id",
            "post_text",
            "title",
            "created_at"
        ],
        include: [
            {
                model: User,
                attributes: ["username"]
            },
            {
                model: Textarea,
                attributes: ["id", "textarea_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: "Post not found."});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create post
router.post("/", withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_text: req.body,post_text,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// update post
router.put("/:id", withAuth, (req, res) => {
    Post.update({
        title: req.body.title,
        post_text: req.body.post_text
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: "Post not found."});
        }
        res.join(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete post
router.delete("/:id", withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message:"Post not found."});
            return;
        }
        res.json(dbPostData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;