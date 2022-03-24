const express = require("express");
const { CreateVendor, LoginVendor, Indexpage, GetVendor, GetVendorById} = require("../controller/admincontroller");
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
const images = multer({storage:imageStorage, fileFilter:fileFilter}).single("image");

router.post("/register",images,CreateVendor);
router.post("/login", LoginVendor);
router.get("/vendors", GetVendor);
router.get("/vendors/:id", GetVendorById);

module.exports = router;