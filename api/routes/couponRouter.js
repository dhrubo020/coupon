const express = require('express');
const router = express.Router();

const {createNewCoupon,getAllCoupon} = require('../controllers/couponController')
//Get a list of all Coupons
router.get("/", getAllCoupon);
router.post("/", createNewCoupon)



module.exports = router;