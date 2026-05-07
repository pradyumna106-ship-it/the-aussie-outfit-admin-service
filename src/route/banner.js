import { Router } from "express";
import {
  createBanner,
  deleteBanner,
  getBannerById,
  getBanners,
  updateBanner
} from "../controller/banner.js";

const router = Router();

router.route("/")
  .get(getBanners)
  .post(createBanner);

router.route("/:id")
  .get(getBannerById)
  .put(updateBanner)
  .delete(deleteBanner);

export default router;
