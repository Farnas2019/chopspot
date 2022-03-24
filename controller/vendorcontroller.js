const   express = require("express");
const Vendor = require("../models/Vendors");
const Food = require("../models/foods");
const multer = require("multer");



const bcrypt = require("bcrypt");



exports.GetVendor = async function(req,res){
    const user = req.user;
    if(user){
        const existingVendor = await Vendor.findById(user._id);
        return res.status(401).json({existingVendor});
    }
    return res.status(401).json({error:"Vendor Does not exist"});
}

exports.UpdateVendor = async function(req,res){
    const {name, ownerName,foodType,address, pincode, phone,password, email} = req.body;
    const user = req.user;
    if(user){
        const existingVendor = await Vendor.findById(user._id);
        var hashedPassword = await bcrypt.hash(password,12);
        if(existingVendor !==null){
            existingVendor.name=name;
            existingVendor.ownerName= ownerName;
            existingVendor.foodType= foodType;
            existingVendor.address=address;
            existingVendor.pincode=pincode;
            existingVendor.phone=phone;
            existingVendor.email=email;
            existingVendor.password= hashedPassword;
           }
      var newVendor = await existingVendor.save();

        return res.status(401).json({newVendor});
    }

    return res.status(404).json({error:"Vendor Does not exist"});
}


exports.Addfood = async function(req,res){
    var {name,  discription, foodType,category,price,readyTime, files} = req.body;
    if(!name || !discription || !foodType || !category ||!price||!readyTime){
    return res.status(401).json({error:"Filelds Can't be empty"});

 }
    const user = req.user;
    if(user){
        const existingVendor = await Vendor.findById(user._id);
        if(existingVendor !== null){
            const image = req.files;
            const file = [];
            image.forEach(async function(image) {
                const img = await image.filename
              file.push(img);
            })

            const food = await Food.create({
                name:name,
                vendorId: existingVendor._id,
                discription:discription,
                foodType:foodType,
                category:category,
                readyTime:readyTime,
                price:price,
                image:file
                      
            });
         
            existingVendor.foods.push(food);
         
            const result = await existingVendor.save();
       
         return res.status(401).json({result});

        }
    }
    return res.status(401).json({error:"Something Went Wrong"});
}
exports.Getfood = async function(req,res){
     const user = req.user;
    if(user){
    const existingFood = await Food.find({vendorId:user._id});
        if(existingFood !== null){
           
        return res.status(401).json({existingFood});

        }
    }
    return res.status(401).json({error:"Something Went Wrong"});
}