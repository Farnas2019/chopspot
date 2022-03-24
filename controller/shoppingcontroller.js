const   express = require("express");
const Vendor = require("../models/Vendors");
const Food = require("../models/foods");
const multer = require("multer");


exports.GetAvailability = async function(req,res){
    const pincode = req.params.pincode;
  
    const result = await Vendor.find({pincode:pincode, availability:true}).sort([["rating", "descending"]]).populate("foods");
    if(result.length>0){
        return res.status(200).json(result);
    }
    return res.status(400).json("somthing is wrong");

}
exports.GetTopRestaurants = async function(req,res){
    const pincode = req.params.pincode;

    const result = await Vendor.find({pincode:pincode, availability:true}).sort([["rating", "descending"]]).limit(2);
    if(result.length>0){
        return res.status(200).json(result);
    }
    return res.status(400).json("somthing is wrong");
}

exports.GetFoodIn30mins = async function(req,res){
    
}
exports.SearchRestaurants = async function(req,res){
    
}
exports.GetRestauranstById = async function(req,res){
    
}