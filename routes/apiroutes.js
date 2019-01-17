const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");

module.exports = function(app) {

    app.get("/api/scrape", (req, res) => {

        axios.get("https://old.reddit.com/r/worldnews/").then(response => {

            let $ = cheerio.load(response.data);
    
            $("p.title").each(function(i, element) {

                if (i != 0) {  // skips the first post which is an ad

                    // Get post info
                    let title = $(element).children('a').text();
                    let link = $(element).children('a').attr("href");

                    // Create new post in db as long as not null and no duplicate
                    let newPost = {title, link};
                    if (newPost.title && newPost.link) {
                        db.Post.findOne({title: newPost.title}, (err, res) => {
                            if (err) 
                                res.json(err);
                            if (!res)  
                                db.Post.create(newPost);           
                        })
                    }
                }
            })
            res.redirect('/')
        })
    });
    
    app.get("/api/clear", (req, res) => {
        db.Post.deleteMany({isSaved: false}).then(
            res.redirect("/")
        )
    })

    app.post("/api/save", (req, res) => {
        db.Post.updateOne(
            {_id: req.body.id}, 
            {$set: {isSaved: true}})
        .then(
            res.redirect("/")
        )
    })

    app.post("/api/unsave", (req, res) => {
        db.Post.updateOne(
            {_id: req.body.id}, 
            {$set: {isSaved: false}})
        .then(
            res.redirect("/saved")
        )
    })





}