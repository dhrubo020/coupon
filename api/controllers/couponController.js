const Coupon = require("../../schema/couponSchema"); 

exports.getAllCoupon = async (req, res, next) => {
  const doc = await Coupon.find()
  res.send(doc)
};

exports.createNewCoupon = async (req, res, next) => {
  const doc = await Coupon.create(req.body);
  res.send(doc)
};
