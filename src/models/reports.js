import mongoose from "mongoose";

const SUMMARY_PERIODS = ["daily", "weekly", "monthly", "yearly"];

const dashboardSummarySchema = new mongoose.Schema(
  {
    period: {
      type: String,
      enum: SUMMARY_PERIODS,
      required: true
    },
    periodStart: {
      type: Date,
      required: true
    },
    periodEnd: {
      type: Date,
      required: true
    },
    totalOrders: {
      type: Number,
      min: 0,
      default: 0
    },
    totalRevenue: {
      type: Number,
      min: 0,
      default: 0
    },
    totalCustomers: {
      type: Number,
      min: 0,
      default: 0
    },
    totalProducts: {
      type: Number,
      min: 0,
      default: 0
    },
    cancelledOrders: {
      type: Number,
      min: 0,
      default: 0
    },
    refundedAmount: {
      type: Number,
      min: 0,
      default: 0
    },
    topProducts: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true
        },
        name: {
          type: String,
          required: true,
          trim: true
        },
        quantitySold: {
          type: Number,
          min: 0,
          default: 0
        },
        revenue: {
          type: Number,
          min: 0,
          default: 0
        }
      }
    ],
    orderStatusCounts: {
      pending: {
        type: Number,
        min: 0,
        default: 0
      },
      confirmed: {
        type: Number,
        min: 0,
        default: 0
      },
      shipped: {
        type: Number,
        min: 0,
        default: 0
      },
      delivered: {
        type: Number,
        min: 0,
        default: 0
      },
      cancelled: {
        type: Number,
        min: 0,
        default: 0
      }
    },
    generatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

dashboardSummarySchema.index(
  { period: 1, periodStart: 1, periodEnd: 1 },
  { unique: true }
);

const Reports = mongoose.model("Reports", dashboardSummarySchema);

export default Reports;