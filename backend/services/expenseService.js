const { ExpenseModel } = require("../models/Expense");

//CreateExpenses
const createExpenseService = async ({
  amount,
  category,
  description,
  userId,
}) => {
  const num = Number(amount); //number validation
  if (Number.isNaN(num) || num <= 0) {
    const error = new Error(
      "Amount must be a positive number and category must not be empty.",
    );
    error.statusCode = 400;
    throw error;
  }
  if (!category || category.trim() === "") {
    const error = new Error(
      "category must not be empty and Please chooise category values!",
    );
    error.statusCode = 400;
    throw error;
  }
  try {
    const createdExpense = await ExpenseModel.create({
      amount,
      category,
      description,
      userId,
    });

    return createdExpense;
  } catch (error) {
    if (error.name === "ValidationError") {
      error.statusCode = 400;
    }
    throw error;
  }
};

//Get All Expenses
const getAllExpenseService = async ({
  userId,
  page = 1,
  limit = 10,
  category,
}) => {
  //calculate skip expenses
  const skip = (page - 1) * limit;
  //findCategory
  const filter = { userId };

  //check database category and given category values from user
  if (category) {
    filter.category = category;
  }

  //find expenses using userId
  const expenses = await ExpenseModel.find(filter)
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit);
  //countDocument calculate totalExpenses from user
  const totalExpenses = await ExpenseModel.countDocuments(filter);

  return { expenses, totalExpenses };
};

//Get Expenses by id
const getExpenseByIdService = async ({ expenseId, userId }) => {
  const getExpenseById = await ExpenseModel.findOne({ _id: expenseId, userId });
  return getExpenseById;
};

//Update Expenses by id
const getUpdatedExpenseByIdService = async ({
  expenseId,
  userId,
  updateData,
}) => {
  const { amount, category, description } = updateData;
  const updateFields = {};
  //update only amount
  if (amount !== undefined) {
    updateFields.amount = amount;

    const num = Number(amount);
    if (Number.isNaN(num) || num <= 0) {
      const error = new Error(" Number values must be positive!");
      error.statusCode = 400;
      throw error;
    }
  }
  //update only category

  if (category !== undefined) {
    updateFields.category = category;

    if (!category || category.trim() === "") {
      const error = new Error(" category must not be empty");
      error.statusCode = 400;
      throw error;
    }
  }

  //update only description

  if (description !== undefined) {
    updateFields.description = description;
  }

  if (
    amount === undefined &&
    category === undefined &&
    description === undefined
  ) {
    const error = new Error("Nothing to enter values for update expense");
    error.statusCode = 400;
    throw error;
  }

  const expense = await ExpenseModel.findOneAndUpdate(
    { _id: expenseId, userId },
    updateFields,
    { new: true, runValidators: true },
  );

  return expense;
};

//Delete Expenses by id
const getDeletedExpenseByIdService = async ({ expenseId, userId }) => {
  const expense = await ExpenseModel.findOneAndDelete({
    _id: expenseId,
    userId,
  });
  return expense;
};

module.exports = {
  createExpenseService,
  getAllExpenseService,
  getExpenseByIdService,
  getUpdatedExpenseByIdService,
  getDeletedExpenseByIdService,
};
