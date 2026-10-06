const {
  createExpenseService,
  getAllExpenseService,
  getExpenseByIdService,
  getUpdatedExpenseByIdService,
  getDeletedExpenseByIdService,
} = require("../services/expenseService");

//handle notFoundError

const{throwError}=require("../utils/error");

//CreateExpenses
const createExpenses = async (req, res,next) => {
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
    next(error)
  }
};

//Get All Expenses
const getAllExpense = async (req, res,next) => {
  try {
    const { userId } = req.user;
    const getExpenses = await getAllExpenseService({ userId });
    throwError(getExpenses);

    res.status(200).json({
      success: true,
      message: " All Expenses fetched successfully",
      getExpenses,
    });
  } catch (error) {
    next(error);
  }
};

//Get Expense By Id
const getSingleExpense = async (req, res,next) => {
  try {
    const { expenseId } = req.params;
    const { userId } = req.user;
    const expense = await getExpenseByIdService({ expenseId, userId });
    throwError(expense);
    res.status(200).json({
      success: true,
      message: "Get expense by id successfully",
      expense,
    });
  } catch (error) {
    next(error);
  }
};

//Update Expenses using id

const updateSingleExpense = async (req, res,next) => {
  try {
    const { expenseId } = req.params;
    const { userId } = req.user;
    const { amount, category, description } = req.body;
    const expense = await getUpdatedExpenseByIdService({
      expenseId,
      userId,
      updateData: { amount, category, description },
    });
    throwError(expense);

    res.status(200).json({
      success: true,
      message: "Update expense by id successfully",
      expense,
    });
  } catch (error) {
    next(error);
  }
};

//Delete Expense By Id
const deleteSingleExpense = async (req, res,next) => {
  try {
    const { expenseId } = req.params;
    const { userId } = req.user;
    const expense = await getDeletedExpenseByIdService({ expenseId, userId });
    
    throwError(expense);

    res.status(200).json({
      success: true,
      message: "Delete expense by id successfully",
      expense,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createExpenses,
  getAllExpense,
  getSingleExpense,
  updateSingleExpense,
  deleteSingleExpense,
};
