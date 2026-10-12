const {
  createBudgetService,
  getBugetService,
  compareBudgetService,
  upsertBudgetService,
  deleteBudgetService,
} = require("../services/budgetService");

//1.create new budget

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

//2.Get all budgets
const getBudgets = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { category, month } = req.query;

    const budgets = await getBugetService({ userId, category, month });

    res.status(200).json({
      success: true,
      message: "Fetch all budgets successfully..",
      budgets,
    });
  } catch (error) {
    next(error);
  }
};

//3.compare budget and actual amount

const compareBudget=async(req,res,next)=>{
  try{
    const{month}=req.query;
    const{userId}=req.user;
     const result= await compareBudgetService({userId,month});
     res.status(200).json({
      success:true,
      message:"Gets all Details with budgets successFull..",
      result
     });
  }catch(error)
  {
  next(error);
}
}

//3.Update budget

const updateBudget = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { category, limit, month } = req.body;
    const updatedBudget = await upsertBudgetService({
      userId,
      category,
      limit,
      month,
    });

    res.status(200).json({
      success: true,
      message: "update budget successfull..",
      updatedBudget,
    });
  } catch (error) {
    next(error);
  }
};

//4.deletebudget by budgetId
const deleteBudget = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { budgetId } = req.params;
    const deletedBudget = await deleteBudgetService({ userId, budgetId });

    res.status(200).json({
      success: true,
      message: "Budget deleted successfull!",
      deletedBudget,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBudget,
  getBudgets,
  compareBudget,
  updateBudget,
  deleteBudget,
};
