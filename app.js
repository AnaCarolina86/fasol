//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const md5 = require("md5");

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
// Model Login
const User = new mongoose.model("User", userSchema);

// Schema Personalizado Data
const personDataSchema = new mongoose.Schema({
    namePerson: String,
    emailPerson: String,
    contactPerson: String,
    urlImagePerson: String,
    imagePerson: String, //I need to change here
    braPerson: String, //tamanho do sutiã
    pantiesWomanPerson: String,
    heightWomanPerson: Number,
    braWomanPerson: Number,
    sobBraPerson: Number,
    waistWomanPerson: Number,
    hipWomanPerson: Number,
    hipManPerson: Number,
    thighManPerson: Number,
    waistManPerson: Number,
    heightManPerson: Number
});

// Model Person 
const Person = new mongoose.model("Person", personDataSchema);

// Schema Contact
const contactSchema = new mongoose.Schema({
    nameContact: String,
    emailContact: String,
    phoneNumberContact: String,
    subjectContact: String,
    textContact: String
});

// Model Contact
const Contact = new mongoose.model("Contact", contactSchema);

// Schema Client
const clientSchema = new mongoose.Schema({
    clientsRequest: [{type: personDataSchema, ref: 'Person'}],
    clientsMessage: [{type: contactSchema, ref: 'Contact'}]
});

// Model Client
const Client = new mongoose.model("Client", clientSchema);

/* -----App Settings----- */

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

/* -----General Routes----- */
app.get("/", function(req, res){

    res.render("home");  
});

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

app.get("/praia", function(req, res){
    res.render("praia");
});

/* -----Personalizado Routes----- */

app.get("/personalizado", function(req, res){
    res.render("personalizado");
});

app.post("/personalizado", function(req, res){

    const newPerson = new Person({
        namePerson: req.body.nameperson,
        emailPerson: req.body.emailperson,
        contactPerson: req.body.contactperson,
        urlImagePerson: req.body.modelurlperson,
        imagePerson: req.body.fileperson, 
        braPerson: req.body.bra,
        pantiesWomanPerson: req.body.pantieswoman,
        heightWomanPerson: req.body.heightwoman,
        braWomanPerson: req.body.brawoman,
        sobBraPerson: req.body.sobBra,
        waistWomanPerson: req.body.waistwoman,
        hipWomanPerson: req.body.hipwoman,
        hipManPerson: req.body.hipman,
        thighManPerson: req.body.thighman,
        waistManPerson: req.body.waistman,
        heightManPerson: req.body.heightman
    });

    newPerson.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.render("success");
        }
    });
});

/* -----Contact Routes----- */
app.get("/contato", function(req, res){
    res.render("contato");
});

app.post("/contato", function(req, res){
    
    const newContact = new Contact({
        nameContact: req.body.namecontact,
        emailContact: req.body.emailcontact,
        phoneNumberContact: req.body.numbercontact,
        subjectContact: req.body.subjectcontact,
        textContact: req.body.messagecontact
    });

    newContact.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.render("success");
        }
    });
    
});

/* -----Register Routes----- */
app.get("/access", function(req,res){
    res.render("access");
});

app.get("/register", function(req, res){
    res.render('register');
});

app.post("/register", function(req, res){
    const newUser = new User({
        username: req.body.userName,
        email: req.body.usermail,
        password: md5(req.body.password)
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
let userAdmin = false;

function checkAuth(req, res, next) {
    if (!userAdmin) {
      res.render("home");
    } 
    else {
      next();
    }
}

app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", function(req, res){
    const username = req.body.userName;
    const password = md5(req.body.password);

    User.findOne({username: username}, function(err, foundUser){
        if(err){
            console.log(err);
        }
        else{
            if(foundUser.password === password){
                if(foundUser.username === "admin"){
                    userAdmin = true;
                    res.redirect("admin");
                }
                else{
                    res.render("home");
                }               
            }
            else{
                res.send("Ops... try again");
            }
        }
    });
});

app.get('/logout', function (req, res) {
    userAdmin = false;
    res.render('home');
});  

app.get("/admin", checkAuth, function(req, res){

    Client.find({}, function(err, clients){
        if(err){
            console.log(err);
        }
        else{
            res.render("admin", {people: clients});
        }
        
    });
    
});


/* -----Blog Routes----- */
// Compose : create new posts, delete, and update
// Target: all posts 
app.route("/compose")
    .get(function(req, res){
        res.render("compose");
    })
    .post(function(req, res){
  
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
    })
    .delete(function(req,res){
        Post.deleteMany(function(err){
            if(!err){
                res.send("Successfully deleted all posts.");
            }
            else{
                res.send(err);
            }
        });
});

// Target: one post

/* -----Acess Client info Routes----- */


app.get("/clientrequest", function(req, res){

    Person.find({}, function(err, people){
        res.render("clientrequest",
        {people: people});
    });
});


app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
});


