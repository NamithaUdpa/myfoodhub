var express = require("express");
var app = express();

var shoppingList = require("./models/shoppinglist.js");

app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
var User = require("./models/user.js");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

var flash=require("connect-flash");
app.use(flash());

var methodOverride =require("method-override");
app.use(methodOverride("_method"));


//Mongoose db connect and required packages
var mongoose = require("mongoose"),
    LocalStrategy = require("passport-local"),
    passport = require("passport");
mongoose.connect("mongodb://localhost/myfoodhub");

//for PASSPORT Configuration

app.use(require("express-session")({
    secret : "Jason",
    resave: false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
        res.locals.currentUser=req.user;
        console.log(res.locals.currentUser);  
        next();
    //res.locals.error=req.flash("error");
    //res.locals.success=req.flash("success");
});

app.get("/", function(req,res){
    res.render("pages/home/home.ejs");
});
//routes from other files
var authRoutes = require("./routes/index.js"),
    recipeRoutes = require("./routes/recipeApi.js"),
    ingredientRoutes = require("./routes/ingredients.js"),
    profileRoutes = require("./routes/profile.js");
app.use(authRoutes);
app.use(recipeRoutes);
app.use(ingredientRoutes);
app.use(profileRoutes);


app.listen(process.env.PORT, process.env.IP,function(res,req){
    console.log("The server has started!");
});