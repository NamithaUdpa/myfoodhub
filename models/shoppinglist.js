var mongoose = require("mongoose");

var shoppinglistSchema = new mongoose.Schema({
    listName: String,
    ingredients: [{
        type: String
    }],
    date: Date,
    frequency: {
        Day:String,
        Every:String
    },
    id:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"ShoppingList"
    }
});

module.exports = mongoose.model("ShoppingList", shoppinglistSchema);