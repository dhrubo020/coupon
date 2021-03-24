const express = require("express");
const router = express.Router();

const {
  createNewCoupon,
  getAllCoupon,
  applyCoupon,
  updateCoupon,
  getOneCoupon,
} = require("../controllers/couponController");

//Get a list of all Coupons
router.get("/", getAllCoupon);
router.get("/:id", getOneCoupon);
router.post("/", createNewCoupon);
router.post("/apply", applyCoupon);
router.put("/update/:id", updateCoupon);

module.exports = router;
