const { Post, User, Textarea } = require("../models");
const router = require("express").Router();
const sequelize = require("../config/connection");
const { route } = require("./api");

router.get("/", (req, res) => {
    console.log(req.session);

    Post.findAll({
      attributes: ["id", "post_text", "title", "created_at"],
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
        res.render("homepage", { posts, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// redirect user to homepage when logged in
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }
    res.render("login");
});

// sign up page
router.get("/signup", (req, res) => {
    res.render("/signup");
});

// single post
router.get("/post/:id", (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "post_text", "title", "created_at"],
      include: [
        {
          model: Textarea,
          attributes: ["id", "post_text", "title", "created_at"],
          include: {
              model: User,
              attributes: ["username"]
          }
        },
        {
            model: User,
            attributes: ["username"]
        }
      ],
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        const post = dbPostData.get({ plain: true });
        res.render("single-post", { post, loggedIn: req.session.loggedIn});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
module.exports = router;