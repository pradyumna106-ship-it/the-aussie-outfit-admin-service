import mongoose from "mongoose";

const DISCOUNT_TYPES = ["percentage", "fixed"];
const COUPON_STATUS = ["draft", "active", "paused", "expired"];

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      unique: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true,
      default: ""
    },
    discountType: {
      type: String,
      enum: DISCOUNT_TYPES,
      required: true
    },
    discountValue: {
      type: Number,
      required: true,
      min: 0
    },
    maxDiscountAmount: {
      type: Number,
      min: 0,
      default: null
    },
    minimumOrderAmount: {
      type: Number,
      min: 0,
      default: 0
    },
    usageLimit: {
      type: Number,
      min: 1,
      default: null
    },
    usageLimitPerUser: {
      type: Number,
      min: 1,
      default: 1
    },
    usedCount: {
      type: Number,
      min: 0,
      default: 0
    },
    startsAt: {
      type: Date,
      required: true
    },
    expiresAt: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: COUPON_STATUS,
      default: "draft"
    },
    applicableProductIds: {
      type: [mongoose.Schema.Types.ObjectId],
      default: []
    },
    applicableCategoryIds: {
      type: [mongoose.Schema.Types.ObjectId],
      default: []
    },
    excludedProductIds: {
      type: [mongoose.Schema.Types.ObjectId],
      default: []
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminUser",
      default: null
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminUser",
      default: null
    }
  },
  {
    timestamps: true
  }
);

couponSchema.index({ status: 1, startsAt: 1, expiresAt: 1 });
couponSchema.index({ applicableProductIds: 1 });
couponSchema.index({ applicableCategoryIds: 1 });

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;