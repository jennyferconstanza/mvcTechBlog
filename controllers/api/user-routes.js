const router = require("express").Router();
const { User, Post, Textarea } = require("../../models");
const withAuth = require("../../utils/auth");

// get api/users
router.get("/", (req, res) => {
    User.findAll({
        attributes: { exclude: ["password"]}
    })
    .then(dbUserData => res.jsons(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get single user by id
router.get("/:id", (req, res) => {
    User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Post,
          attributes: ["id", "title", "post_text", "created_at"],
        },
        {
          model: Textarea,
          attributes: ["id", "textarea_text", "created_at"],
          include: {
            model: Post,
            attributes: ["title"],
          },
        },
      ],
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "User not found." });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});

// create user
router.post("/", (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);
        });
    });
});

// user log in
router.post("/login", (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(400).json({ message: "Email address not found" });
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);

        if(!validPassword) {
            res.status(400).json({ message: "Incorrect." });
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: "Logged in."});
        });
    });
});
// log out
router.post("/logout", withAuth, (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
          res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
// update user
router.put("/:id", withAuth, (req, res) => {
    User.update(req.body, {
      individualHooks: true,
      where: {
          id: req.params.id
      }
    })
    .then(dbUserData => {
        if(!dbUserData[0]) {
            res.status(404).json({ message: "User not found."});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// delete
router.delete("/:id", withAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: "User not found."});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
module.exports = router;