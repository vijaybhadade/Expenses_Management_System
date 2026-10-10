const {ExpenseModel} = require("../models/Expense");
const mongoose=require("mongoose");
const {
  getCategoryStatsByServices,
  getRecentExpensesByService,
  getExpenseStatsByService,
} = require("../services/expenseService");
const getExecutedDashBoard = async ({ userId,from,to }) => {
  const [stats, categoryStats, recentExpenses] = await Promise.all([
    getExpenseStatsByService({ userId,from,to }),
    getCategoryStatsByServices({ userId,from,to }),
    getRecentExpensesByService({ userId,from,to }),
  ]);
  return { stats, categoryStats, recentExpenses };
};

const getRangeDataByServices = async ({ userId, from, to }) => {
    const endDate= new Date(to);
    endDate.setDate(endDate.getDate()+1);
    const startDate=new Date(from);

  const result = await ExpenseModel.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        date:{
            $gte:startDate,
            $lt:endDate
        }
      },
    }

  ]);
  return result;
};

module.exports = { getExecutedDashBoard, getRangeDataByServices };
