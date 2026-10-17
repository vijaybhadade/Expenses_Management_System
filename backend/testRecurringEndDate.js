const mongoose = require("mongoose");
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
      startDate: new Date("2026-10-16T00:00:00.000Z"),
      endDate: new Date("2026-10-17T00:00:00.000Z"),
      nextDueDate: new Date("2026-10-17T00:01:00.000Z"),
      isActive: true,
    });
    console.log("Temporary rule created with ID:", createdRule._id);

    await processRecurringTransactionService(createdRule._id);

    const updatedRule = await RecurringModel.findById(createdRule._id);

    console.log("\n--- Test Results ---");
    console.log("isActive:", updatedRule.isActive);
    console.log("nextDueDate:", updatedRule.nextDueDate);
  } catch (error) {
    console.error("Test failed:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("\nDatabase disconnected.");
  }
};

runTest();
