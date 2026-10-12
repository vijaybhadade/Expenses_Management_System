
const { 
    createBudgetService,
    getBugetService,
} = require("../services/budgetService");

//create new budget

const createBudget = async (req, res, next) => {
  try {
    const { category, limit, month } = req.body;
    const { userId } = req.user;

    const { createdBudget } = await createBudgetService({
      userId,
      category,
      limit,
      month,
    });

    res.status(201).json({
      success: true,
      message: "Budget created successfully..",
      createdBudget,
    });
  } catch (error) {
    next(error);
  }
};

//Get all budgets
const getBudgets= async (req, res, next) => {
  try {
    const {userId}=req.user;
    const {category,month}=req.query;

    const budgets = await getBugetService({ userId,category,month });
  
    res.status(200).json({
      success: true,
      message: "Fetch all budgets successfully..",
      budgets,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createBudget, getBudgets};
