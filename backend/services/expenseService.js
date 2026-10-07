const { ExpenseModel } = require("../models/Expense");

//CreateExpenses
const createExpenseService = async ({
  amount,
  category,
  description,
  userId,
}) => {
  const num = Number(amount); //number validation
  if (Number.isNaN(num) || num <= 0 || !category || category.trim() === "") {
    const error = new Error(
      "Amount must be a positive number and category must not be empty.",
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
const getAllExpenseService = async ({ userId, page = 1, limit = 10 }) => {
  
  const skip = (page - 1) * limit;
 
  const expenses = await ExpenseModel.find({ userId })
    .skip(skip)
    .limit(limit);

  const totalExpenses=await ExpenseModel.countDocuments({userId});

  return {expenses,totalExpenses};
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
  updateData
}) => {
  const { amount, category, description } =updateData;
   const updateFields={};
   //update only amount
  if (amount !== undefined) {

    updateFields.amount =amount;

    const num = Number(amount);
    if (Number.isNaN(num) || num <= 0) {
      const error = new Error(" Number values must be positive!");
      error.statusCode = 400;
      throw error;
    }
  }
  //update only category 

  if (category !== undefined) {

    updateFields.category =category;

    if (!category || category.trim() === "") {
      const error = new Error(" category must not be empty");
      error.statusCode = 400;
      throw error;
    }

  } 

  //update only description 

  if (description !== undefined) {

    updateFields.description =description;


  }  

  if(amount===undefined && category===undefined && description===undefined)
  {
    const error= new Error("Nothing to enter values for update expense");
    error.statusCode=400;
    throw error;
  }

  const expense = await ExpenseModel.findOneAndUpdate(
    { _id: expenseId, userId },
    updateFields,
    { new: true,
      runValidators:true
    },
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
