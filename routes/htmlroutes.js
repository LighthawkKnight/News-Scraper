const db = require('../models');

module.exports = function (app) {

    app.get("/", (req, res) => {
        db.Post.deleteMany({}).then(
        db.Post.find({}).then(posts => {
            res.render('index', {posts: posts});
        }).catch(err => {
            res.json(err);
        }))
    })

    app.get("/saved", (req, res) => {
        res.render("saved");
    })

    
    app.get("/clear", (req, res) => {
        db.Post.deleteMany({}).then(
            res.redirect("/")
        )
    })
}