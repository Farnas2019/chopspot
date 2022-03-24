const mongoose = require("mongoose");

var vendorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    ownerName:{
        type: String,
        required: true
    },
    foodType:{
        type: [String],
    },
    address:{
        type: String,
        required: true
    },
    pincode:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    serviceAvailable:{
        type:Boolean,
    },
    coverImage:{
        type:String,
    },
    rating:{
        type: Number,
    },
    availability:{
        type: Boolean,
    },
    foods:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Food"
    }]
}, {
    toJSON:{
        transform(doc,ret){
            delete ret.password;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },
    timestamps:true});


const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;