const mongoose = require("mongoose");

var foodSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true 
    },
    vendorId:{
        type: String,
        required: true 
    },
    discription:{
        type: String,
        required: true 
    },
    foodType:{
        type: String,
        required: true 
    },
    category:{
        type: String,
        required: true 
    },
   readyTime:{
        type: String,
        required: true 
    },
    price:{
        type: String,
        required: true 
    },
    image:{
        type: [String]
 
    }
},{timestamps: true});

var Food = mongoose.model("Food", foodSchema);

module.exports = Food;