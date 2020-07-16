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

export {Post, User, Person, Contact};