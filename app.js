//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const encrypt = require('mongoose-encryption');

/* -----DataBase----- */
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://atlas-anacarolina:mongotodov2@cluster0-tddmo.mongodb.net/fasolDB', {useNewUrlParser: true, useUnifiedTopology: true });

// Schema Posts
const postSchema = {
    title: String,
    subtitle: String,
    content: String
};
// Model Post
const Post = mongoose.model("Post", postSchema);

// Schema Login
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

let token = "";
require('crypto').randomBytes(64, function(err, buffer) {
    token = buffer.toString('base64');
});

userSchema.plugin(encrypt, { secret: token, encryptedFields: ["password"]}); 
//its important to add this plugin before creating the model
//secret: process.env.SECRET
// Model Admin
const User = new mongoose.model("User", userSchema);

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

app.get("/access", function(req,res){
    res.render("access");
})

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

/* -----Register Routes----- */
app.get("/register", function(req, res){
    res.render('register');
});

app.post("/register", function(req, res){
    const newUser = new User({
        username: req.body.userName,
        email: req.body.usermail,
        password: req.body.password
    });

    newUser.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.render("home");
        }
    });
    
});

/* -----Login Routes----- */
app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", function(req, res){
    const username = req.body.userName;
    const password = req.body.password;

    User.findOne({username: username}, function(err, foundUser){
        if(err){
            console.log(err);
        }
        else{
            if(foundUser.password === password){
                if(foundUser.username === "admin"){
                    res.render("compose");
                }
                else{
                    res.render("home");
                }               
            }
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


