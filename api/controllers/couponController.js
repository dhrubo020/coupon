const couponService = require("../services/couponService");

exports.createNewCoupon = async (req, res, next) => {
  try {
    const doc = await couponService.createNew(req.body);
    if (doc) res.send(doc);
  } catch (error) {
    next(error);
  }
};

exports.applyCoupon = async (req, res, next) => {
  try {
    const doc = await couponService.apply(req.body);
    res.send(doc);
  } catch (error) {
    next(error);
  }
};

exports.getAllCoupon = async (req, res, next) => {
  try {
    const doc = await couponService.getAll();
    res.send(doc);
  } catch (error) {
    next(error);
  }
};

exports.getOneCoupon = async (req, res, next) => {
  try {
    const doc = await couponService.getOne(req.params.id);
    res.send(doc);
  } catch (error) {
    next(error);
  }
};
exports.updateCoupon = async (req, res, next) => {
  try {
    const doc = await couponService.update(req.params.id, req.body);
    res.send(doc);
  } catch (error) {
    next(error);
  }
};
