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
    const{page=1,limit=10}=req.query;
    const{category}=req.query;
    
      const allowedCategory=["Food", "Fashion", "Equipment",  "Electronics"]
      //check it undefined
      if(category!==undefined && !allowedCategory.includes(category))
      {
        return res.status(400).json({
          success:false,
          message:"Please enter valide category values"
        });
      }

    const numPage=Number(page);
    const numLimit=Number(limit);
    
    if(!Number.isInteger(numPage) || numPage < 1 )
    {
      return res.status(400).json({
        success:false,
        message:"Page must be positive and greater than 0"
      });
    }

     if(!Number.isInteger(numLimit) || numLimit < 1 || numLimit >100  )
    {
      return res.status(400).json({
        success:false,
        message:"Limit must be positive , greater than 0  and maximum limit should be 100"
      });
    }
    //access expenses and totalExpeses from service
    const {expenses,totalExpenses} = await getAllExpenseService({ userId,page:numPage,limit:numLimit,category });

    //calculate page count using Math.ceil
    const totalPage=Math.ceil(totalExpenses/numLimit);
    
    //Everything fine then return to client 
    res.status(200).json({
      success: true,
      message: " All Expenses fetched successfully",
      "pagination":{
        "total":totalExpenses,
        "currentPage":numPage,
        "limit":numLimit,
        "totalPages":totalPage,
      },
      expenses,
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
    const { amount, category, description }=req.body;
    const expense = await getUpdatedExpenseByIdService({
      expenseId,
      userId,
      updateData:{ amount, category, description },
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
    const expense = await getDeletedExpenseByIdService({ expenseId, userId});
    
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
