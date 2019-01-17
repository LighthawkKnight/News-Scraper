const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");

module.exports = function(app) {

app.get("/scrape", (req, res) => {
    console.log("Scraped @ " + Date.now);

    axios.get("https://old.reddit.com/r/worldnews/").then(response => {

        let $ = cheerio.load(response.data);
   
        $("p.title").each(function(i, element) {

            if (i != 0) {  // skips the first post which is an ad

                // Get post info
                let title = $(element).children('a').text();
                let link = $(element).children('a').attr("href");

                // Create new post in db as long as both are not null
                let newPost = {title, link};
                if (newPost.title && newPost.link)
                    db.Post.create(newPost);
            }
        });

        res.redirect("/");
    });
});





    // console.log("\nr/worldnews Scraper" +
    //             "\n*******************\n")

    // axios.get("https://old.reddit.com/r/worldnews/").then(response => {

    // // Load the HTML into cheerio and save it to a variable
    // // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    // var $ = cheerio.load(response.data);

    // // An empty array to save the data that we'll scrape
    // var results = [];
    // // var scoreArr = [];

    // // With cheerio, find each p-tag with the "title" class
    // // (i: iterator. element: the current element)
    // $("p.title").each(function(i, element) {

    //     // Save the text of the element in a "title" variable
    //     // var title = $(element).text();
    //     var title = $(element).children('a').text();

    //     // In the currently selected element, look at its child elements (i.e., its a-tags),
    //     // then save the values for any "href" attributes that the child elements may have
    //     var link = $(element).children('a').attr("href");

    //     // Save these results in an object that we'll push into the results array we defined earlier
    //     results.push({
    //     title: title,
    //     link: link
    //     });
    // });

    // // $(`.score`).attr(`title`, (i, val) => {
    // //     scoreArr.push(val);
    // // });

    // // Log the results once you've looped through each of the elements found with cheerio
    // console.log(results);
    // // console.log(scoreArr);
    // })

}