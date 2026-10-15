const { RecurringModel } = require("../models/RecurringTransaction");

// 1. Create RecurringTransaction
const createRecurringTransactionService = async ({
  userId,
  amount,
  type,
  category,
  description,
  frequency,
  startDate,
  endDate,
  nextDueDate,
}) => {
  const num = Number(amount);
  const typeAllow = ["income", "expense"];
  const allowIncome = [
    "Salary",
    "Freelance",
    "Business",
    "Investment",
    "Scholarship",
    "Gift",
  ]; 

  const allowExpense = [
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

  const allowFrequency = ["daily", "weekly", "monthly", "yearly"];

  
  if (isNaN(num) || !type || !category || !frequency || !startDate || !nextDueDate) {
    const error = new Error("Please enter values in fields: amount, type, category, frequency, startDate, nextDueDate");
    error.statusCode = 400;
    throw error;
  }

  if (!Number.isFinite(num) || num <= 0) {
    const error = new Error("Amount must be greater than zero!");
    error.statusCode = 400;
    throw error;
  }

  if (typeof type !== "string" || type.trim() === "") {
    const error = new Error("Type must not be empty!");
    error.statusCode = 400;
    throw error;
  }

  if (typeof category !== "string" || category.trim() === "") {
    const error = new Error("Category must not be empty!");
    error.statusCode = 400;
    throw error;
  }

  if (!typeAllow.includes(type)) {
    const error = new Error("Please enter valid values into type!");
    error.statusCode = 400;
    throw error;
  } 

  if (type === "income" && !allowIncome.includes(category)) {
    const error = new Error("Please enter valid values into category!");
    error.statusCode = 400;
    throw error;
  }

  if (type === "expense" && !allowExpense.includes(category)) {
    const error = new Error("Please enter valid values into category!");
    error.statusCode = 400;
    throw error;
  }
 
  if (typeof frequency !== "string" || frequency.trim() === "" || !allowFrequency.includes(frequency)) {
    const error = new Error("Frequency must not be empty!");
    error.statusCode = 400;
    throw error;
  }

  
  const dateParse = new Date(startDate);
  if (isNaN(dateParse.getTime())) {
    const error = new Error("Please enter valid values into startDate!");
    error.statusCode = 400;
    throw error;
  }

  const nextDueDateParse = new Date(nextDueDate);
  if (isNaN(nextDueDateParse.getTime())) {
    const error = new Error("Please enter valid values into nextDueDate!");
    error.statusCode = 400;
    throw error;
  }

  let endDateParse;
  if (endDate) {
    endDateParse = new Date(endDate);
    if (isNaN(endDateParse.getTime())) {
      const error = new Error("Please enter valid values into endDate!");
      error.statusCode = 400;
      throw error;
    }
  }


  if (nextDueDateParse < dateParse) {
    const error = new Error("Next due date must not be earlier than start date!");
    error.statusCode = 400;
    throw error;
  }

 
  if (endDateParse && endDateParse < dateParse) {
    const error = new Error("End date must not be earlier than start date!");
    error.statusCode = 400;
    throw error;
  }

  
  if (endDateParse && nextDueDateParse > endDateParse) {
    const error = new Error("Next due date must not be later than end date!");
    error.statusCode = 400;
    throw error;
  }

  

  const createRecurring = await RecurringModel.create({
    userId,
    amount: num,
    type,
    category,
    frequency,
    startDate: dateParse,
    nextDueDate: nextDueDateParse,
    description,
    endDate: endDateParse,
  });

  return createRecurring;
};

// 2. Get All RecurringTransaction
const getRecurringTransactionService = async ({ userId }) => {};

// 3. Get RecurringTransaction By Id
const getRecurringTransactionByIdService = async ({ userId }) => {};

// 4. Update RecurringTransaction By Id
const updateRecurringTransactionService = async ({ userId }) => {};

// 5. Delete RecurringTransaction
const deleteRecurringTransactionService = async ({ userId }) => {};

module.exports = {
  createRecurringTransactionService,
  getRecurringTransactionService,
  getRecurringTransactionByIdService,
  updateRecurringTransactionService,
  deleteRecurringTransactionService,
};