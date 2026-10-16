const { RecurringModel } = require("../models/RecurringTransaction");
const { ExpenseModel } = require("../models/Expense");
const { IncomeModel } = require("../models/Income");

//1.RecurringTransaction automation
const getDueRecurringTransactionService = async () => {
    //Rrturn current date
    const currentDate = new Date();
   
  //Query recurring
  const recurring = await RecurringModel.find({
    isActive: true,
    startDate: { $lte: currentDate },
    nextDueDate: { $lte: currentDate },
    $or: [
      { endDate: { $exists: false } }, //if endDate does not exist
      {endDate:null},
      { endDate: { $gte:currentDate } }, //if endDate is exists
    ],
  });

  return recurring;
};

//2.CalculateNextDueDate
const calculateNextDueDate = (currentDate, frequency, isMonthEnd) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const date = currentDate.getDate();
  let nextDueDate;
  //check frequency values then  nextDueDate perform 
  if (frequency === "monthly") {
    const lastDay = new Date(year, month + 2, 0).getDate();
    let nextDay;
    if (isMonthEnd) {
      nextDay = lastDay;
    } else {
      nextDay = Math.min(date, lastDay);
    }
    nextDueDate= new Date(year,month+1,nextDay);
  } else if (frequency === "weekly") {
    nextDueDate = new Date(currentDate);
    nextDueDate.setDate(nextDueDate.getDate() + 7);
  }else if (frequency === "daily") {
    nextDueDate = new Date(currentDate);
    nextDueDate.setDate(nextDueDate.getDate() + 1);
  }else if (frequency === "yearly") {
    nextDueDate= new Date(year + 1, month, date);
  }
  return nextDueDate;
};

//3.ProcessRecurringTransactionService
const processRecurringTransactionService = async () => {};

module.exports = {
  getDueRecurringTransactionService,
  calculateNextDueDate,
  processRecurringTransactionService,
};
