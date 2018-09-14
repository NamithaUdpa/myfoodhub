var express = require("express"),
    router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended:true}));
    
var List = require("../models/shoppinglist.js");
var User = require("../models/user.js");


router.get("/ingredients", function(req,res){
    res.render("pages/ingredients/ingredientsResults.ejs");
});

router.post("/ingredients", function(req,res){
    var currentUser = res.locals.currentUser;
    console.log(currentUser);
    var ingredients = req.body.ingredient;
    var listName = req.body.listName;
    var newList = {listName:listName, ingredients:ingredients};
    //User.find(req.user).populate("shoppingLists").exec().;
    List.create(newList, function(err, newlyCreated){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(newlyCreated);
            console.log(newlyCreated._id);
            currentUser.shoppingLists.push(newlyCreated._id);
            currentUser.save(function(){
                if(err){
                    console.log(err);
                    console.log(currentUser);
                }else{
                    console.log(currentUser);
                }
            });
            
            //console.log(User)
            // User.findByIdAndUpdate(req.user.id, newList,function(err, foundUser){
            //     if(err){
            //         console.log(err);
            //         res.redirect("/ingredients");
            //     }else{
            //         User
            //         res.send("submitted");
            //     }
            //});
            res.redirect("back");
        }
    });
});

module.exports = router;