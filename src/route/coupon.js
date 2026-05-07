import { Router } from "express";
import {
  createCoupon,
  deleteCoupon,
  getCouponById,
  getCoupons,
  updateCoupon
} from "../controller/coupon.js";

const router = Router();

router.route("/")
  .get(getCoupons)
  .post(createCoupon);

router.route("/:id")
  .get(getCouponById)
  .put(updateCoupon)
  .delete(deleteCoupon);

export default router;