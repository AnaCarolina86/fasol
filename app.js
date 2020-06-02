//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){

    res.render("home");
  
});

app.get("/nossa-historia", function(req, res){

    res.render("nossa-historia");
});

app.get("/contato", function(req, res){

    res.render("contato");
});

app.get("/blog", function(req, res){

    res.render("blog");
});

app.get("/personalizado", function(req, res){

    res.render("personalizado");
});

app.get("/praia", function(req, res){

    res.render("praia");
});




app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
});


