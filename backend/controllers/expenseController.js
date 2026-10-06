const {
  createExpenseService,
  getAllExpenseService,
  getExpenseByIdService,
  getUpdatedExpenseByIdService,
  getDeletedExpenseByIdService,
} = require("../services/expenseService");

//CreateExpenses
const createExpenses = async (req, res) => {
  const { amount, category, description } = req.body;
  try {
    const { userId } = req.user;
    const createdExpense = await createExpenseService({
      amount,
      category,
      description,
      userId,
    });

    res.status(201).json({
      success: true,
      message: "New expenses created!",
      createdExpense,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

//Get All Expenses
const getAllExpense = async (req, res) => {
  try {
    const { userId } = req.user;
    const getExpenses = await getAllExpenseService({ userId });
    if (getExpenses===null) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expenses fetched successfully",
      getExpenses,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      message: error.message || "Expenses fetching failed",
    });
  }
};

//Get Expense By Id
const getSingleExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const { userId } = req.user;
    const expense = await getExpenseByIdService({ expenseId, userId });
    if (expense===null) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Get expense by id successfully",
      expense,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Expenses fetching by id failed ",
    });
  }
};

//Update Expenses using id

const updateSingleExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const { userId } = req.user;
    const { amount, category, description } = req.body;
    const expense = await getUpdatedExpenseByIdService({
      expenseId,
      userId,
      updateData: { amount, category, description },
    });
    if (expense === null) {
      return res.status(404).json({
        success: false,
        message: "Expense not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Update expense by id successfully",
      expense,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Expenses updating by id failed ",
    });
  }
};

//Delete Expense By Id
const deleteSingleExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const { userId } = req.user;
    const expense = await getDeletedExpenseByIdService({ expenseId, userId });
    if (expense === null) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Delete expense by id successfully",
      expense,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Expenses delete by id failed ",
    });
  }
};

module.exports = {
  createExpenses,
  getAllExpense,
  getSingleExpense,
  updateSingleExpense,
  deleteSingleExpense,
};
