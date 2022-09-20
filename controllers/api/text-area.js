const router = require("express").Router();
const { Textarea } = require("../../models");
const withAuth = require("../../utils/auth");

// get text area
router.get("/", (req, res) => {
    Textarea.findAll({})
    .then(dbTextareaData => res.json(dbTextareaData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// create text area
router.post("/", withAuth, (req, res) => {
    if(req.session) {
        Textarea.create({
            textarea_text: req.body.textarea_text,
            post_id: req.body.post_id,
            user_id: req. session.user_id,
        })
        .then(dbTextareaData => res.json(dbTextareaData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    }
});

//delete text area
router.delete("/:id", withAuth, (req, res) => {
    Textarea.destroy({
        where:{
            id: req.params.id
        }
    }).then(dbTextareaData => {
        if(!dbTextareaData) {
            res.status(404).json({ message: "Text area not found."});
            return;
        }
        res.json(dbTextareaData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
module.exports = router; 