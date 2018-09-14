var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");
    
 var UserSchema = new mongoose.Schema({
     username: String,
     password: String,
     birthday: Date,
     gender: String,
     country: String,
     shoppingLists:[{
        type : mongoose.Schema.Types.ObjectId,
        ref:"ShoppingList"
    }]
 });
 
 UserSchema.plugin(passportLocalMongoose);
  
 
 module.exports = mongoose.model("User", UserSchema);