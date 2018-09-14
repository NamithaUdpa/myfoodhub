//base npm packages
var express = require("express"),
    request = require("request"),
    router = express.Router();

router.get("/recipes", function(req,res){
    res.render("pages/recipes/recipes.ejs");
});


module.exports = router;