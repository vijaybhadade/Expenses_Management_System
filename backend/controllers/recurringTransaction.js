const {
  createRecurringTransactionService,
  getRecurringTransactionService,
  getRecurringTransactionByIdService,
  updateRecurringTransactionService,
  deleteRecurringTransactionService,
} = require("../services/recurringTransactionService");

//1.create recurringTransaction
const createRecurringTransaction = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const {
      amount,
      type,
      category,
      description,
      frequency,
      startDate,
      endDate,
      nextDueDate,
    } = req.body;

    const Recurring = await createRecurringTransactionService({
      userId,
      amount,
      type,
      category,
      description,
      frequency,
      startDate,
      endDate,
      nextDueDate,
    });

    res.status(201).json({
      success: true,
      message: "Create recurringTransaction successfully..",
      Recurring,
    });
  } catch (error) {
    next(error);
  }
};

//2.Get all recurringTransaction
const getRecurringTransaction = async (req, res, next) => {};
//3.Get recurringTransaction by Id
const getRecurringTransactionById = async (req, res, next) => {};
//4.update recurringTransaction by Id
const updateRecurringTransaction = async (req, res, next) => {};
//5.create recurringTransaction
const deleteRecurringTransaction = async (req, res, next) => {};
module.exports = {
  createRecurringTransaction,
  getRecurringTransaction,
  getRecurringTransactionById,
  updateRecurringTransaction,
  deleteRecurringTransaction,
};
