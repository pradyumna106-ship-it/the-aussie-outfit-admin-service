import mongoose from "mongoose";

const BANNER_PLACEMENTS = ["home-hero", "home-section", "category-page", "product-page", "cart-page"];
const BANNER_STATUS = ["draft", "active", "paused", "expired"];

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    subtitle: {
      type: String,
      trim: true,
      default: ""
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true
    },
    mobileImageUrl: {
      type: String,
      trim: true,
      default: ""
    },
    targetUrl: {
      type: String,
      trim: true,
      default: ""
    },
    placement: {
      type: String,
      enum: BANNER_PLACEMENTS,
      required: true
    },
    sortOrder: {
      type: Number,
      default: 0
    },
    startsAt: {
      type: Date,
      required: true
    },
    expiresAt: {
      type: Date,
      default: null
    },
    status: {
      type: String,
      enum: BANNER_STATUS,
      default: "draft"
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

bannerSchema.index({ placement: 1, status: 1, sortOrder: 1 });
bannerSchema.index({ startsAt: 1, expiresAt: 1 });

const Banner = mongoose.model("Banner", bannerSchema);

export default Banner;