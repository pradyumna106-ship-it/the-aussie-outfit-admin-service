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
app.options('/api', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form
app.use("/uploads", express.static("uploads"));
app.get('/', (req, res) => {
  res.status(200).json({ message: "API Connected Successfully" })
})
app.use('/api/admin/coupon',couponRouter);
app.use('/api/admin/banner',bannerRouter);
app.use('/api/admin/reports/sales',reportRouter);

export default app;