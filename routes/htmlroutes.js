const db = require('../models');

module.exports = function (app) {

    app.get("/", (req, res) => {
        db.Post.find({isSaved: false}).then(posts => {
            res.render('index', {posts: posts});
        }).catch(err => {
            res.json(err);
        })
    })

    app.get("/saved", (req, res) => {
        db.Post.find({isSaved: true}).then(posts => {
            res.render('saved', {posts: posts});
        }).catch(err => {
            res.json(err);
        })
    })

}