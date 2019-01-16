// Dependencies
const express = require("express");
// const mongojs = require("mongojs");
// const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

const PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();

// Middleware
app.use(express.urlencoded({
	extended: false
}));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
	"handlebars",
	exphbs({
		defaultLayout: "main"
	})
);
app.set("view engine", "handlebars");

// Routes
require("./routes/htmlroutes")(app);
require("./routes/apiroutes")(app);

app.listen(PORT, function () {
  console.log(`This application is running on port: ${PORT}`);
});
