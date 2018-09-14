var express = require("express"),
    router = express.Router();
var bodyParser = require("body-parser");

var User = require("../models/user.js");
var shoppingList = require("../models/shoppinglist.js");
var Lists = new Array();

router.use(bodyParser.urlencoded({extended:true}));

router.get("/profile", function(req,res){
    var userShoppinglistIds = res.locals.currentUser.shoppingLists;
    console.log(userShoppinglistIds.length);
        for(var i=0;i<userShoppinglistIds.length; i++){
            shoppingList.findById(userShoppinglistIds[i],function(err, foundlist){
                if(err){
                    console.log(err);
                }else{
                    Lists.push(foundlist);
                }
            });
        }
    res.render("pages/profile/userProfile.ejs",{shoppingLists:Lists});
    Lists.length = 0;
});

module.exports = router;