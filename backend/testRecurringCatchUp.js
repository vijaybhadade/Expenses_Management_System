require("dotenv").config();

const mongoose = require("mongoose");
const { ExpenseModel } = require("./models/Expense");
const { RecurringModel } = require("./models/RecurringTransaction");
const database = require("./config/db");
const {
  processRecurringTransactionService,
} = require("./services/recurringTransactionAutomationService"); // Adjust path as needed

const runTest = async () => {
  try {
    await database();

    const createdRule = await RecurringModel.create({
      userId: "6acbd9971db662130d148dee",
      amount: 150,
      type: "expense",
      category: "Food & Dining",
      frequency: "daily",
      startDate: new Date("2026-10-14T00:00:00.000Z"),
      nextDueDate: new Date("2026-10-14T00:00:00.000Z"),
      isActive: true,
    });
    console.log("Temporary rule created with ID:", createdRule._id);

    await processRecurringTransactionService(createdRule._id);
    const expenses = await ExpenseModel.find({
      recurringRuleId: createdRule._id,
    }).sort({ scheduledOccurrenceDate: 1 });

    console.log("Expenses created:", expenses.length);

    expenses.forEach((expense) => {
      console.log(
        "Scheduled occurrence:",
        expense.scheduledOccurrenceDate.toISOString(),
      );
    });

    const updatedRule = await RecurringModel.findById(createdRule._id);
    console.log("Next due date:", updatedRule.nextDueDate.toISOString());
  } catch (error) {
    console.error("Test failed:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("\n Database disconnected.");
  }
};

runTest();
