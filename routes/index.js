//=====================
//File for all authentication routes
//=====================

//require for routes
var express = require("express"),
    router = express.Router();
    
//require for passport login
var passport = require("passport");


//User and shopping list models
var User = require("../models/user.js");

//=============
//Login Routes
//=============
//render the login page
router.get("/login", function(req,res){
    res.render("pages/auth/login");
});
//handle login form input
router.post("/login", passport.authenticate("local", {
    successRedirect : "/",
    failureRedirect : "/login"
}),function(req,res){
    console.log("LOGGED IN");
});

//===============
//Register Routes
//===============
router.get("/register", function(req,res){
    //render the signup page
    res.render("pages/auth/register");
});

router.post("/register", function(req,res){
    var newUser = new User({username : req.body.username,country:req.body.country,birthday:req.body.birthday,gender:req.body.gender});
    User.register(newUser, req.body.password, function(err, currentUser){
        if(err){
            console.log(err);
            return res.render("pages/auth/register.ejs");
        }
        passport.authenticate("local")(req,res, function(){
            res.redirect("/");
        });
    });
});
//=============
//Logout Routes
//=============
router.get("/logout", function(req,res){
    req.logout();
    res.redirect('/');
});

module.exports = router;