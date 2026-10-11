const { BudgetModel } = require("../models/Budget");

const createBudgetService = async ({ userId, category, limit, month }) => {
  const num = Number(limit);
  const normalizeMonth=Number(month);

  //check validation month
  if(isNaN(normalizeMonth) || normalizeMonth <1 || normalizeMonth > 12)
  {
    const error= new Error("Invalide month values!");
    error.statusCode=400;
    throw error;
  }
  //check validation limit
  if (Number.isNaN(num) || num <= 0) {
    const error = new Error(
      "Limit amount must be a positive number and limit must be greater than zero!",
    );
    error.statusCode = 400;
    throw error;
  }
  //check validation category
  

  if (category ||category.trim() === "") {
    const error = new Error(
      "category must not be empty and Please chooise category values!",
    );
    error.statusCode = 400;
    throw error;
  }
  //check if user code not provide any vlaues and trying to create 
  if(category===undefined || num===undefined || normalizeMonth===undefined)
  {
    const error= new Error("Please enter all fields values: category , limit and month");
    error.statusCode=400;
    throw error;
  }
  try {
    const result = await BudgetModel.exists({ userId ,category,month:normalizeMonth});
    if (result) {
      const error = new Error("Budget already exists!");
      error.statusCode = 409;
      throw error;
    }

    const createdBudget=await BudgetModel.create({userId,category,limit:num,month:normalizeMonth});

    return {createdBudget};
  } catch (error) {
    if (error.name === "ValidationError") {
      error.statusCode = 400;
    }
    throw error;
  }
};

module.exports = { createBudgetService };
