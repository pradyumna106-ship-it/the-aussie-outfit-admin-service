import express from "express"
import cors from "cors";
import couponRouter from "./route/coupon.js"
import bannerRouter from "./route/banner.js"
import reportRouter from "./route/report.js";
const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true}));
app.options('', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form
app.use("/uploads", express.static("uploads"));

app.use('/coupon',couponRouter);
app.use('/banner',bannerRouter);
app.use('/reports/sales',reportRouter);

export default app;