const mongoose = require('mongoose'); 
mongoose.set('useCreateIndex', true);

const couponModel = new mongoose.Schema(
  {
    couponID: {
      type: String,
      required: true,
    },
    couponCode: {
      type: String,
      required: true,
    },
    couponDescription: {
      type: String,
      required: true,
    },
    couponDiscountPercentage: {
      type: Number,
      required: true,
    },
    couponDiscountLimit: {
      type: Number,
      required: true,
    },
    couponDiscountAmount: {
      type: Number,
      required: true,
    },
    couponDiscountMinimumAmount: {
      type: Number,
      required: true,
    },
    couponExpireDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const couponSchema = mongoose.model("coupon", couponModel);
module.exports = couponSchema