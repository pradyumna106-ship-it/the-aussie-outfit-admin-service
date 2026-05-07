import Coupon from "../models/coupon.js"

export const createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Coupon created successfully",
      data: coupon
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const getCoupons = async (req, res) => {
  try {
    const { status, discountType, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (discountType) filter.discountType = discountType;

    const skip = (Number(page) - 1) * Number(limit);

    const [coupons, total] = await Promise.all([
      Coupon.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Coupon.countDocuments(filter)
    ]);

    return res.status(200).json({
      success: true,
      data: coupons,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getCouponById = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: coupon
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Coupon updated successfully",
      data: coupon
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Coupon deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};