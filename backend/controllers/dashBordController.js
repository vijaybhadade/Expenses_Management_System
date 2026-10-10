const {
  getExecutedDashBoard,
  getRangeDataByServices,
} = require("../services/dashBordService");

const getAllData = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { from, to } = req.query;
    if (Boolean(from) !== Boolean(to)) {
      return res.status(400).json({
        success: false,
        message: "from or to missing!",
      });
    }
    let fromDate;
    let toDate;
    if (from && to) {
       fromDate = new Date(from);
       toDate = new Date(to);
      if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "from or to invalide format!",
        });
      }

      if (fromDate > toDate) {
        return res.status(400).json({
          success: false,
          message: "from data must be less than to!",
        });
      }
    }

    const result = await getExecutedDashBoard({
      userId,
      from: fromDate,
      to: toDate,
    });
    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

const getRangeData = async (req, res, next) => {
  try {
    const { from, to } = req.query;
    const { userId } = req.user;
    if (!from || !to) {
      return res.status(400).json({
        success: false,
        message: "from or to missing!",
      });
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);
    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "from or to invalide format!",
      });
    }

    if (fromDate > toDate) {
      return res.status(400).json({
        success: false,
        message: "from data must be less than to!",
      });
    }
    const expenses = await getRangeDataByServices({
      userId,
      from: fromDate,
      to: toDate,
    });

    res.status(200).json({
      success: true,
      expenses,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllData, getRangeData };
