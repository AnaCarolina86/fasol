//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

/* -----DataBase----- */
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://atlas-anacarolina:mongotodov2@cluster0-tddmo.mongodb.net/fasolDB', {useNewUrlParser: true, useUnifiedTopology: true });

// Schema
const postSchema = {
    title: String,
    subtitle: String,
    content: String
};
// Model
const Post = mongoose.model("Post", postSchema);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){

    res.render("home");  
});

/* -----General Routes----- */

app.get("/nossa-historia", function(req, res){

    res.render("nossa-historia");
});

app.get("/blog", function(req, res){

    Post.find({}, function(err, posts){

        res.render("blog", {     
          posts: posts     
        }); 
    });
});

app.get("/personalizado", function(req, res){

    res.render("personalizado");
});

app.get("/praia", function(req, res){

    res.render("praia");
});

/* -----Blog Routes----- */
// Compose : create new posts

app.get("/compose", function(req, res){
    
    res.render("compose");
});
  
app.post("/compose", function(req, res){
  
    const post = new Post({
      title: req.body.postTitle,
      subtitle: req.body.postSubtitle,
      content: req.body.postBody
    });
    
    post.save(function(err){
      if(!err){
        res.redirect("/");
      }
      else{
          console.log(err);
      }
    });    
});

/* -----Contact Routes----- */
app.get("/contato", function(req, res){

    res.render("contato");
});

app.post("/contato", function(req, res){
    
});




app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
});


