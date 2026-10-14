const { ExpenseModel } = require("../models/Expense");
const { IncomeModel } = require("../models/Income");

const getTransactionServices = async ({ userId, page, limit, type }) => {
  const skip = (page - 1) * limit;

  const normalizedType = type ? type.trim().toLowerCase() : "all";

  // 1. Income Branch
  if (normalizedType === "income") {
    const getIncome = await IncomeModel.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalIncome = await IncomeModel.countDocuments({ userId });
    const totalPages = Math.ceil(totalIncome / limit);
    
    return { 
      data: getIncome, 
      totalTransactions: totalIncome, 
      page, 
      limit, 
      totalPages 
    };
  } 
  
  // 2. Expenses Branch
  else if (normalizedType === "expenses") {
    const expenses = await ExpenseModel.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalExpenses = await ExpenseModel.countDocuments({ userId });
    const totalPages = Math.ceil(totalExpenses / limit);
    
    return { 
      data: expenses, 
      totalTransactions: totalExpenses, 
      page, 
      limit, 
      totalPages 
    };
  }

  // 3. Combined ("all") Branch
  const getIncome = await IncomeModel.find({ userId });
  const expenses = await ExpenseModel.find({ userId });

  const allTransaction = [
    ...getIncome.map((data) => ({
      ...data.toObject(),
      transactionType: "income",
    })),
    ...expenses.map((data) => ({
      ...data.toObject(),
      transactionType: "expenses",
    })),
  ];

  // Sort them with createdAt
  allTransaction.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const totalTransactions = allTransaction.length;
  const totalPages = Math.ceil(totalTransactions / limit);
  const paginationTransaction = allTransaction.slice(skip, skip + limit);

  // Fixed: Renamed 'paginationTransaction' to 'data' for consistency with income/expenses
  return { 
    data: paginationTransaction, 
    totalTransactions, 
    page, 
    limit, 
    totalPages 
  };
};

module.exports = { getTransactionServices };