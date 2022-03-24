const jwt = require("jsonwebtoken");
const {APP_SECRET} = require("../config/keys");
const mongoose = require("mongoose");
const Vendor = require("../models/Vendors");
module.exports = function(req,res,next){
    var {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error:"You must be logged in First"});
    }
    var token = authorization.replace("Bearer ", "");
    jwt.verify(token,APP_SECRET,function(err,payload){
        if(err){
        return res.status(401).json({error:"You must be logged in First"});
        }
        const {_id} = payload;
        Vendor.findById(_id).then(function(result){
            req.user = result;
            next();
        })
       
    })
}