const Coupon = require("../../schema/couponSchema");

exports.createNew = async (body) => {
  if (
    (body.couponDiscountPercentage > 0 && body.couponDiscountAmount === 0) ||
    (body.couponDiscountPercentage === 0 && body.couponDiscountAmount > 0)
  ) {
    console.log(body);
    const doc = await Coupon.create(body);
    return doc;
  } else {
    throw new Error(
      "One of couponDiscountPercentage or couponDiscountAmount must be 0 "
    );
  }
};

exports.apply = async (body) => {
  let finalPrice = 0;
  const initPrice = body.grandTotal;
  const couponInfo = await this.findByCouponCode(body.couponCode);

  if (body.grandTotal < couponInfo.couponDiscountMinimumAmount) {
    return "Coupon not applicable";
  }

  if (couponInfo?.couponDiscountPercentage > 0) {
    let priceReduce = Math.floor(
      initPrice * (couponInfo.couponDiscountPercentage / 100)
    );
    if (priceReduce > couponInfo.couponDiscountLimit) {
      console.log("limit applied");
      priceReduce = couponInfo.couponDiscountLimit;
    }

    const discountedPrice = initPrice - priceReduce;
    //  what if discountedPrice will 0
    finalPrice = discountedPrice;
  } //else
  else if (couponInfo?.couponDiscountAmount > 0) {
    finalPrice = initPrice - couponInfo.couponDiscountAmount;
  }

  return { finalPrice };
};

//------------------------------------

exports.getAll = async () => {
  const doc = await Coupon.find();
  if (doc) return doc;
  throw new Error("No data found");
};

exports.getOne = async (id) => {
  const doc = await Coupon.findById({ _id: id });
  if (doc) return doc;
  throw new Error("No data found");
};

exports.update = async (id, body) => {
  try {
    const doc = await this.findByMongoID(id);
    if (!doc) throw new Error("No data found with this coupon id");
    for (const key of doc) {
      doc[key] = body[key];
    }
    const data = await doc.save();
    if (data) return data;
    throw new Error("Error occured in update");
  } catch (error) {
    return error;
  }
};

exports.delete = async (id) => {
  try {
    const doc = await Coupon.findByIdAndDelete;
    if (!doc) throw new Error("No data found with this coupon id");
    for (const key of doc) {
      doc[key] = body[key];
    }
    const data = await doc.save();
    if (data) return data;
    throw new Error("Error occured in update");
  } catch (error) {
    return error;
  }
};

//------------------- find coupon by id ------------------

exports.findByMongoID = async (id) => {
  const doc = await Coupon.findById(id);
  if (doc) return doc;
  throw new Error("No data found");
};

exports.findByCouponID = async (id) => {
  const doc = await Coupon.findOne({ couponID: id });
  if (doc) return doc;
  throw new Error("No data found");
};

exports.findByCouponCode = async (code) => {
  const doc = await Coupon.findOne({ couponCode: code });
  if (doc) return doc;
  throw new Error("No data found");
};
