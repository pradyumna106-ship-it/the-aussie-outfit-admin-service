import Banner from "../models/banner.js";

export const createBanner = async (req, res) => {
  try {
    const banner = await Banner.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Banner created successfully",
      data: banner
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const getBanners = async (req, res) => {
  try {
    const { placement, status, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (placement) filter.placement = placement;
    if (status) filter.status = status;

    const skip = (Number(page) - 1) * Number(limit);

    const [banners, total] = await Promise.all([
      Banner.find(filter)
        .sort({ sortOrder: 1, createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Banner.countDocuments(filter)
    ]);

    return res.status(200).json({
      success: true,
      data: banners,
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

export const getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: banner
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      data: banner
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Banner deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};