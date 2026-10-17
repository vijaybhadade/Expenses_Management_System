require("dotenv").config();

const expenseService = require("./services/expenseService");

const mongoose = require("mongoose");
const { RecurringModel } = require("./models/RecurringTransaction");
const { ExpenseModel } = require("./models/Expense");
const database = require("./config/db");

const originalCreateExpenseService =
  expenseService.createExpenseService;

let failedRuleId = null;

expenseService.createExpenseService = async (data) => {
  if (
    failedRuleId &&
    data.recurringRuleId.toString() === failedRuleId.toString()
  ) {
    throw new Error("Intentional test failure for Rule A");
  }

  return originalCreateExpenseService(data);
};

const {
  processRecurringTransactionService,
} = require("./services/recurringTransactionAutomationService");

const runTest = async () => {
  try {
    await database();

    // 1. Create Rule A: Intentionally faulty rule
    const ruleA = await RecurringModel.create({
      userId: "6acbd9971db662130d148dee",
      type: "expense",
      category: "Food & Dining",
      amount: 100,
      frequency: "daily",
      startDate: new Date(Date.now() - 86400000 * 2),
      nextDueDate: new Date(Date.now() - 86400000),
      isActive: true,
    });

    // 2. Create Rule B (valid rule that should succeed normally)
    const ruleB = await RecurringModel.create({
      userId: "6acbd9971db662130d148dee",
      type: "expense",
      category: "Food & Dining",
      amount: 50,
      frequency: "daily",
      startDate: new Date(Date.now() - 86400000 * 2),
      nextDueDate: new Date(Date.now() - 86400000),
      isActive: true,
    });

    // Activate the mock to target Rule A specifically
    failedRuleId = ruleA._id;

    console.log("Test rules created. Running processRecurringTransactionService...\n");

    // Call the service with no ID so it processes all due rules (Rule A first, then Rule B)
    await processRecurringTransactionService();

    // 3. Verify Results
    const expensesA = await ExpenseModel.find({ recurringRuleId: ruleA._id });
    const expensesB = await ExpenseModel.find({ recurringRuleId: ruleB._id });

    console.log("\n--- Verification Results ---");
    console.log(`Rule A Expenses Count: ${expensesA.length} (Expected: 0)`);
    console.log(`Rule B Expenses Count: ${expensesB.length} (Expected: >= 1)`);

    expensesB.forEach((expense) => {
      console.log(
        "Rule B Scheduled occurrence:",
        expense.scheduledOccurrenceDate.toISOString()
      );
    });

    // Clean up test records
    await RecurringModel.deleteMany({ _id: { $in: [ruleA._id, ruleB._id] } });
    await ExpenseModel.deleteMany({ recurringRuleId: { $in: [ruleA._id, ruleB._id] } });

  } catch (error) {
    console.error("Test suite failed unexpectedly:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("\nDatabase disconnected.");
  }
};

runTest();