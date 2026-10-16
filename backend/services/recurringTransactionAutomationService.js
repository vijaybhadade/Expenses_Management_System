const { RecurringModel } = require("../models/RecurringTransaction");
const { createIncomeServices } = require("../services/incomeService");
const { createExpenseService } = require("../services/expenseService");
const { ExpenseModel } = require("../models/Expense");
const { IncomeModel } = require("../models/Income");
// 1. RecurringTransaction automation
const getDueRecurringTransactionService = async (recurringRuleId) => {
  const currentDate = new Date();

  const query = {
    isActive: true,
    startDate: { $lte: currentDate },
    nextDueDate: { $lte: currentDate },
  };

  if (recurringRuleId) {
    query._id = recurringRuleId;
  }

  const recurring = await RecurringModel.find(query);

  return recurring;
};

// 2. CalculateNextDueDate
const calculateNextDueDate = (currentDate, frequency, isMonthEnd) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const date = currentDate.getDate();
  let nextDueDate;

  if (frequency === "monthly") {
    const lastDay = new Date(year, month + 2, 0).getDate();
    let nextDay;
    if (isMonthEnd) {
      nextDay = lastDay;
    } else {
      nextDay = Math.min(date, lastDay);
    }
    nextDueDate = new Date(year, month + 1, nextDay);
  } else if (frequency === "weekly") {
    nextDueDate = new Date(currentDate);
    nextDueDate.setDate(nextDueDate.getDate() + 7);
  } else if (frequency === "daily") {
    nextDueDate = new Date(currentDate);
    nextDueDate.setDate(nextDueDate.getDate() + 1);
  } else if (frequency === "yearly") {
    nextDueDate = new Date(year + 1, month, date);
  }
  return nextDueDate;
};

// 3. Process recurring transaction Service
const processRecurringTransactionService = async (recurringRuleId) => {
  const recurringRules =
    await getDueRecurringTransactionService(recurringRuleId);
  const currentDate = new Date();

  for (let recurring of recurringRules) {
    let currentDueDate = new Date(recurring.nextDueDate);

    while (currentDueDate.getTime() <= currentDate.getTime()) {
      // End-date validation check
      if (
        recurring.endDate &&
        currentDueDate.getTime() > new Date(recurring.endDate).getTime()
      ) {
        await RecurringModel.findByIdAndUpdate(recurring._id, {
          $set: { isActive: false },
        });
        break;
      }

      // Create the transaction with duplicate verification
      try {
        if (recurring.type === "expense") {
          await createExpenseService({
            userId: recurring.userId,
            amount: recurring.amount,
            category: recurring.category,
            date: new Date(currentDueDate),
            recurringRuleId: recurring._id,
            scheduledOccurrenceDate: new Date(currentDueDate),
          });
        } else if (recurring.type === "income") {
          await createIncomeServices({
            userId: recurring.userId,
            amount: recurring.amount,
            source: recurring.source,
            date: new Date(currentDueDate),
            recurringRuleId: recurring._id,
            scheduledOccurrenceDate: new Date(currentDueDate),
          });
        } else {
          throw new Error(
            `Unsupported recurring transaction type: ${recurring.type}`,
          );
        }
      } catch (error) {
        if (error.code === 11000) {
          let existingTransaction = null;

          if (recurring.type === "expense") {
            existingTransaction = await ExpenseModel.findOne({
              recurringRuleId: recurring._id,
              scheduledOccurrenceDate: currentDueDate,
            });
          } else if (recurring.type === "income") {
            existingTransaction = await IncomeModel.findOne({
              recurringRuleId: recurring._id,
              scheduledOccurrenceDate: currentDueDate,
            });
          }

          // If duplicate error occurred but the record isn't actually there, rethrow
          if (!existingTransaction) {
            throw error;
          }
          // If it exists, we treat it as successfully handled and proceed
        } else {
          // Rethrow any other unexpected errors
          throw error;
        }
      }

      // Calculate the next due date
      const nextDueDate = calculateNextDueDate(
        currentDueDate,
        recurring.frequency,
        recurring.isMonthEnd,
      );

      let updateData = { nextDueDate: nextDueDate };
      if (
        recurring.endDate &&
        nextDueDate.getTime() > new Date(recurring.endDate).getTime()
      ) {
        updateData.isActive = false;
      }

      await RecurringModel.findByIdAndUpdate(recurring._id, {
        $set: updateData,
      });

      if (updateData.isActive === false) {
        break;
      }

      currentDueDate = nextDueDate;
    }
  }
};

module.exports = {
  calculateNextDueDate,
  processRecurringTransactionService,
};
