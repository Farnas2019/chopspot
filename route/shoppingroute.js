const express = require("express");
const path = require("path");
const { GetTopRestaurants, GetFoodIn30mins, SearchRestaurants, GetRestauranstById, GetAvailability } = require("../controller/shoppingcontroller");


var router = express.Router();

// Available food
router.get("/:pincode", GetAvailability);
// Top resturanst
router.get("/top-resturants/:pincode", GetTopRestaurants);
// Food in #0 mins
router.get("/food-in-30mins/:pincode", GetFoodIn30mins);
// Search For Food
router.get("/search/:pincode", SearchRestaurants);
// get all restaurants
router.get("/restaurant/:pincode", GetRestauranstById);

module.exports = router;