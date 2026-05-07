import Reports from "../models/reports.js";

export const upsertReport = async (req, res) => {
  try {
    const { period, periodStart, periodEnd } = req.body;

    const summary = await Reports.findOneAndUpdate(
      { period, periodStart, periodEnd },
      req.body,
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true
      }
    );

    return res.status(200).json({
      success: true,
      message: "Dashboard summary saved successfully",
      data: summary
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const getReports = async (req, res) => {
  try {
    const { period, from, to, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (period) filter.period = period;

    if (from || to) {
      filter.periodStart = {};
      if (from) filter.periodStart.$gte = new Date(from);
      if (to) filter.periodStart.$lte = new Date(to);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [summaries, total] = await Promise.all([
      Reports.find(filter)
        .sort({ periodStart: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Reports.countDocuments(filter)
    ]);

    return res.status(200).json({
      success: true,
      data: summaries,
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

export const getReportById = async (req, res) => {
  try {
    const summary = await Reports.findById(req.params.id);

    if (!summary) {
      return res.status(404).json({
        success: false,
        message: "Dashboard summary not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: summary
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const summary = await Reports.findByIdAndDelete(req.params.id);

    if (!summary) {
      return res.status(404).json({
        success: false,
        message: "Dashboard summary not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Dashboard summary deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};