const { BudgetModel } = require("../models/Budget");

const monthValidation = /^\d{4}-(0[1-9]|1[0-2])$/;

const createBudgetService = async ({ userId, category, limit, month }) => {
  const num = Number(limit);

  // Check if any required field is missing or undefined
  if (!userId || !category || num === undefined || !month) {
    const error = new Error("Please enter all fields values: userId, category, limit and month");
    error.statusCode = 400;
    throw error;
  }

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
  if (Number.isNaN(num) || num <= 0) {
    const error = new Error(
      "Limit amount must be a positive number and limit must be greater than zero!"
    );
    error.statusCode = 400;
    throw error;
  }

  // Check validation for category and trim it
  if (typeof category !== "string" || category.trim() === "") {
    const error = new Error(
      "Category must not be empty and please choose category values!"
    );
    error.statusCode = 400;
    throw error;
  }
  const normalizedCategory = category.trim();

  try {
    const result = await BudgetModel.exists({ userId, category: normalizedCategory, month: normalizeMonth });
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

module.exports = { createBudgetService };