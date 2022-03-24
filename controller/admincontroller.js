const   express = require("express");
const Vendor = require("../models/Vendors");
const bcrypt = require("bcrypt");
const jwt =     require("jsonwebtoken");
const {APP_SECRET} = require("../config/keys");

exports.Indexpage = async function(req,res){
    // return res.status(401).json({Message:"You Got me"});
    
    console.log(req.user);
}

exports.CreateVendor = async function(req,res){
    const {name, ownerName,foodType,address, pincode, phone,password, email, availability} = req.body;
    if(!name|| !ownerName  || !foodType || !address || !pincode || !password ||!phone || !email ||!availability){
      return res.status(401).json({message: "All the fields must be filled "});
    }    
    const savedUser = await Vendor.findOne({email:email});
    if(savedUser){
      return res.status(403).json({status: 403, message:"User Already Exist ", data:savedUser});
      
    }
    const image = req.file;
      bcrypt.hash(password,12).then(function(hashedPassword){
            const User = new Vendor({
                name:name,
                ownerName: ownerName,
                foodType:foodType,
                address:address,
                pincode: pincode,
                phone:phone,
                email:email,
                availability:availability,
                coverImage: image.filename,
                password:hashedPassword,
                foods: []
            })
            User.save().then(function(result){
                return res.status(300).json({status: 300, message:"Vendor is beign created successffully", data: result});
                }).catch(function(err){
                return res.status(401).json({errror: err});
            })
        }).catch(function(err){
            return res.status(300).json({error: err});
        })     
    
    
}

exports.LoginVendor = 
    async  function(req,res){
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(401).json({message: "All the fields must be filled "});
        }
        const savedUser = await Vendor.findOne({email:email});
        if(!savedUser){
            return res.status(401).json({message: "User Does Not exist"});
        }
        bcrypt.compare(password,savedUser.password).then(function(match){
        // return res.status(300).json({message: "Signed in Succefully"});
        const token = jwt.sign({_id:savedUser._id}, APP_SECRET);
        res.json({token:token});
       }).catch(function(err){
        return res.status(300).json({message: err});
      })
    }

exports.GetVendor = 
    async  function(req,res){
       const vendors = await Vendor.find();
       if(vendors !=null){
            return res.status(200).json(vendors);
       }
       return res.status(400).json("No resturants available");

    }
exports.GetVendorById = 
    async  function(req,res){
    const vendorId = req.params.id;
       const vendors = await Vendor.findById(vendorId);
       if(vendors !=null){
            return res.status(200).json(vendors);
       }
       return res.status(400).json("No resturants available");

    }
