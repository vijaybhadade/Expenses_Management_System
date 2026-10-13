const {
  createIncomeServices,
  getIncomeServices,
  getIncomeByIdServices,
  updateIncomeServices,
  deleteIncomeServices,
} = require("../services/incomeService");

const createIncome = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { amount, source, description, date } = req.body;

    const income = await createIncomeServices({
      userId,
      amount,
      source,
      description,
      date,
    });
    res.status(201).json({
      sucess: true,
      message: "Income created successfully",
      income: income,
    });
  } catch (error) {
    next(error);
  }
};

const getIncome = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { page = 1, limit = 10 } = req.query;

    const numPage = Number(page);
    const numLimit = Number(limit);

    if (!Number.isInteger(numPage) || numPage < 1) {
      return res.status(400).json({
        success: false,
        message: "Page must be a positive integer greater than 0",
      });
    }

    if (!Number.isInteger(numLimit) || numLimit < 1 || numLimit > 100) {
      return res.status(400).json({
        success: false,
        message:
          "Limit must be a positive integer greater than 0 and maximum limit should be 100",
      });
    }

    const { income, totalIncome, currentPage, totalPages } =
      await getIncomeServices({
        userId,
        page: numPage,
        limit: numLimit,
      });

    return res.status(200).json({
      success: true,
      income,
      totalIncome,
      pagination: {
        currentPage,
        limit: numLimit,
        totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};
const getIncomeById = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { incomeId } = req.params;

    const income = await getIncomeByIdServices({ userId, incomeId });
    res.status(200).json({
      success: true,
      message: "Get income by incomeId",
      income,
    });
  } catch (error) {
    next(error);
  }
};

const updateIncome = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { incomeId } = req.params;
    const { amount, source, description, date } = req.body;
    const updatedIncome = await updateIncomeServices({
      userId,
      incomeId,
      amount,
      source,
      description,
      date,
    });
    res.status(200).json({
      success: true,
      message: "Updated income by incomeId",
      updatedIncome,
    });
  } catch (error) {
    next(error);
  }
};

const deleteIncome = async (req,res,next) => {
    try {
    const { userId } = req.user;
    const { incomeId } = req.params;
    const deletedIncome = await deleteIncomeServices({
      userId,
      incomeId,
    });
    res.status(200).json({
      success: true,
      message: "Deleted income by incomeId",
      deletedIncome,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createIncome,
  getIncome,
  getIncomeById,
  updateIncome,
  deleteIncome,
};
