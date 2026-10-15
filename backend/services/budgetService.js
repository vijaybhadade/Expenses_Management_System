const { BudgetModel } = require("../models/Budget");
const { ExpenseModel } = require("../models/Expense");
const mongoose = require("mongoose");
const monthValidation = /^\d{4}-(0[1-9]|1[0-2])$/;

const allowCategory = [
  "Food & Dining",
  "Groceries",
  "Transportation",
  "Housing & Rent",
  "Utilities",
  "Healthcare",
  "Shopping",
  "Entertainment",
  "Education",
  "Personal Care",
  "Travel",
  "EMI & Loans",
  "Insurance",
  "Family & Gifts",
];

//1.Create budget api
const createBudgetService = async ({ userId, category, limit, month }) => {
  // Check if any required field is missing or undefined (or null)
  if (!userId || !category || limit === undefined || limit === null || !month) {
    const error = new Error(
      "Please enter all fields values: userId, category, limit and month",
    );
    error.statusCode = 400;
    throw error;
  }

  const num = Number(limit);

  // Check validation for month format (YYYY-MM)
  if (!monthValidation.test(month)) {
    const error = new Error("Invalid month format! Expected YYYY-MM.");
    error.statusCode = 400;
    throw error;
  }

  // Normalize month into a Date
  const [year, monthNumber] = month.split("-").map(Number);
  const normalizeMonth = new Date(Date.UTC(year, monthNumber - 1, 1));

  // Check validation for limit
  if (!Number.isFinite(num) || num <= 0) {
    const error = new Error(
      "Limit amount must be a positive number and limit must be greater than zero!",
    );
    error.statusCode = 400;
    throw error;
  }

  // Check validation for category and trim it
  if (typeof category !== "string" || category.trim() === "") {
    const error = new Error(
      "Category must not be empty and please choose category values!",
    );
    error.statusCode = 400;
    throw error;
  }
  const normalizedCategory = category.trim();

  // Validate allowed categories
  if (!allowCategory.includes(normalizedCategory)) {
    const error = new Error("Please enter valid category values!");
    error.statusCode = 400;
    throw error;
  }

  try {
    const result = await BudgetModel.exists({
      userId,
      category: normalizedCategory,
      month: normalizeMonth,
    });
    if (result) {
      const error = new Error("Budget already exists!");
      error.statusCode = 409;
      throw error;
    }

    const createdBudget = await BudgetModel.create({
      userId,
      category: normalizedCategory,
      limit: num,
      month: normalizeMonth,
    });

    return { createdBudget };
  } catch (error) {
    if (error.name === "ValidationError") {
      error.statusCode = 400;
    }
    throw error;
  }
};

//2.Get all budgets
const getBugetService = async ({ userId, category, month }) => {
  const filter = { userId };

  if (month !== undefined) {
    if (!monthValidation.test(month)) {
      const error = new Error("Invalid month format! Expected YYYY-MM.");
      error.statusCode = 400;
      throw error;
    }

    const [year, monthNumber] = month.split("-").map(Number);
    filter.month = new Date(Date.UTC(year, monthNumber - 1, 1));
  }

  if (category !== undefined) {
    if (typeof category !== "string" || category.trim() === "") {
      const error = new Error(
        "Category must not be empty and please choose category values!",
      );
      error.statusCode = 400;
      throw error;
    }

    const normalizedCategory = category.trim();

    if (!allowCategory.includes(normalizedCategory)) {
      const error = new Error("Please enter valid category values!");
      error.statusCode = 400;
      throw error;
    }

    filter.category = normalizedCategory;
  }

  const budget = await BudgetModel.find(filter);
  
  return budget;
};

//3.get Compare budget and actual amount
const compareBudgetService = async ({ userId, month }) => {
  //month validation
  if (month === undefined) {
    const error = new Error("Please enter month values!");
    error.statusCode = 400;
    throw error;
  }
  if (typeof month !== "string" || !monthValidation.test(month)) {
    const error = new Error("Invalide month format! Expected YYYY-MM.");
    error.statusCode = 400;
    throw error;
  }

  const [year, monthNumber] = month.split("-").map(Number);
  const normalizeMonth = new Date(Date.UTC(year, monthNumber - 1, 1));

  //start date
  const startDate = normalizeMonth;

  //end date
  const endDate = new Date(Date.UTC(year, monthNumber, 1));

  const budgets = await BudgetModel.find({ userId, month: normalizeMonth });

  const result = await ExpenseModel.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        date: {
          $gte: startDate,
          $lt: endDate,
        },
      },
    },
    {
      $group: {
        _id: "$category",
        totalSpend: {
          $sum: "$amount",
        },
        totalExpenses: {
          $sum: 1,
        },
      },
    },
  ]);

  //compare values and calculate remaingBudget,acutalSpending and limit
  const compareResult = budgets.map((budget) => {
    const budgetCategory = budget.category;
    const budgetLimit = budget.limit;
    const categoryMatch = result.find(
      (expense) => expense._id === budgetCategory,
    );
    const totalSpend = categoryMatch?.totalSpend ?? 0; // check if there is no spend value
    const totalExpenses = categoryMatch?.totalExpenses ?? 0; // check if there is no expense value
    const remainingBudget = budgetLimit - totalSpend; // calculate remaining amount
    const usagePercentage =
      budgetLimit > 0 ? (totalSpend / budgetLimit) * 100 : 0;

    let status;

    if (usagePercentage > 100) {
      status = "exceeded";
    } else if (usagePercentage >= 90) {
      status = "near_limit";
    } else {
      status = "within_budget";
    }

    return {
      category: budgetCategory,
      budgetLimit,
      actualSpending: totalSpend,
      totalExpenses,
      usagePercentage,
      remainingBudget,
      status,
    };
  });

  return { monthDate: month, comparisons: compareResult };
};

//4.update budget
const upsertBudgetService = async ({ userId, category, limit, month }) => {
  const updateFields = {};

  // 2. Make userId, category, limit, and month required (handling undefined and null)
  if (!userId || !category || limit === undefined || limit === null || !month) {
    const error = new Error(
      "userId, category, limit, and month are required fields!",
    );
    error.statusCode = 400;
    throw error;
  }

  // 1. Declare normalizedCategory and normalizeMonth in a scope accessible to the final database operation
  let normalizedCategory;
  let normalizeMonth;

  // Check limit validation
  const num = Number(limit);
  if (!Number.isFinite(num) || num <= 0) {
    const error = new Error("limit values must be positive!");
    error.statusCode = 400;
    throw error;
  }
  // Store the converted numeric limit in updateFields.limit, not the original string
  updateFields.limit = num;

  // Category validation
  if (typeof category !== "string" || category.trim() === "") {
    const error = new Error("category must not be empty");
    error.statusCode = 400;
    throw error;
  }
  normalizedCategory = category.trim();
  if (!allowCategory.includes(normalizedCategory)) {
    const error = new Error(
      "Given category values does not exists into database!",
    );
    error.statusCode = 400;
    throw error;
  }
  updateFields.category = normalizedCategory;

  // Month validation using regex for YYYY-MM format

  if (!monthValidation.test(month)) {
    const error = new Error("Invalid month format! Expected YYYY-MM.");
    error.statusCode = 400;
    throw error;
  }

  const [year, monthNumber] = month.split("-").map(Number);
  normalizeMonth = new Date(Date.UTC(year, monthNumber - 1, 1));
  updateFields.month = normalizeMonth;

  try {
    const updateBudget = await BudgetModel.findOneAndUpdate(
      { userId, category: normalizedCategory, month: normalizeMonth },
      { $set: updateFields },
      {
        new: true,
        upsert: true,
        runValidators: true,
      },
    );

    if (!updateBudget) {
      const error = new Error("No Budget Found!");
      error.statusCode = 404;
      throw error;
    }

    return updateBudget;
  } catch (error) {
    if (error.name === "ValidationError") {
      error.statusCode = 400;
    } else if (error.code === 11000) {
      error.statusCode = 409;
      error.message = "Budget already exists!";
    }
    throw error;
  }
};

//5.Delete budget using budgetID
const deleteBudgetService = async ({ userId, budgetId }) => {
  //validate budgetId
  if (!mongoose.Types.ObjectId.isValid(budgetId)) {
    const error = new Error("Invalide budget Id!");
    error.statusCode = 400;
    throw error;
  }

  const isBudget = await BudgetModel.findOneAndDelete({
    _id: budgetId,
    userId,
  });
  if (!isBudget) {
    const error = new Error("Budget does not exist!");
    error.statusCode = 404;
    throw error;
  }
  return isBudget;
};
module.exports = {
  createBudgetService,
  getBugetService,
  compareBudgetService,
  upsertBudgetService,
  deleteBudgetService,
};
