const express = require("express");
const path = require("path");
const {GetVendor, UpdateVendor, Addfood, Getfood} = require("../controller/vendorcontroller");
const isLoggedIn = require("../middleware/isLoggedIn");

const multer = require("multer");

var router = express.Router();

const imageStorage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, "uploads");
    },
    filename: function(req,file, cb){
        cb(null, file.fieldname + '-' + Date.now())
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const images = multer({storage:imageStorage, fileFilter:fileFilter}).array("image", 10);

router.get("/profile",isLoggedIn, GetVendor);
router.patch("/profile",isLoggedIn,UpdateVendor);

router.post("/food",isLoggedIn,images, Addfood);
router.get("/food",isLoggedIn, Getfood);


module.exports = router;