import { Router } from "express";
import { deleteReport, getReportById, getReports, upsertReport } from "../controller/reports.js";

const router = Router();

router.route("/")
    .get(getReports)
    .post(upsertReport)

router.route("/:id")
    .get(getReportById)
    .delete(deleteReport)

export default router;