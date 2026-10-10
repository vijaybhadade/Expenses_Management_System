const { ExpenseModel } = require("../models/Expense");
const mongoose = require("mongoose");


//call function 
const buildExpenseMatch = ({ userId, from, to }) => {
  const match = {
    userId: new mongoose.Types.ObjectId(userId),
  };

  if (from && to) {
    const startDate = new Date(from);
    const endDate = new Date(to);

    // Include the entire end date
    endDate.setDate(endDate.getDate() + 1);

    match.date = {
      $gte: startDate,
      $lt: endDate,
    };
  }

  return match;
};


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

//Calculate tatalSpend and totalExpenses
const getExpenseStatsByService = async ({ userId,from,to }) => {
  const result = await ExpenseModel.aggregate([
    {
      $match: buildExpenseMatch({ userId, from, to }),
    },
    {
      $group: {
        _id: null,
        totalSpend: { $sum: "$amount" },
        totalExpenses: { $sum: 1 },
      },
    },
  ]);
  const stats = result[0] || { totalSpend: 0, totalExpenses: 0 };
  return { totalSpend: stats.totalSpend, totalExpenses: stats.totalExpenses };
};

//get category-wise statistic
const getCategoryStatsByServices = async ({ userId,from,to }) => {
  const result = await ExpenseModel.aggregate([
    {
      $match:  buildExpenseMatch({ userId, from, to }),
    },
    {
      $group: {
        _id: "$category",
        totalSpend: { $sum: "$amount" },
        totalExpenses: { $sum: 1 },
      },
    },
  ]);
  return result;
};

//get Recently-expenses by sort date

const getRecentExpensesByService = async ({ userId,from,to }) => {
  const result = await ExpenseModel.aggregate([
    {
      $match: buildExpenseMatch({ userId, from, to })
    },
    {
      $sort: { date: -1 },
    },
    {
      $limit: 5,
    },
  ]);
  return result;
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
  getExpenseStatsByService,
  getUpdatedExpenseByIdService,
  getDeletedExpenseByIdService,
  getCategoryStatsByServices,
  getRecentExpensesByService
};
