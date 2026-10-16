require("dotenv").config();

const mongoose = require("mongoose");
const database = require("./config/db");

const {
  processRecurringTransactionService,
} = require("./services/recurringTransactionAutomationService");

const runTest = async () => {
  try {
    await database();

    const recurringRuleId = "PASTE_TEST_RECURRING_RULE_ID_HERE";

    if (!mongoose.isValidObjectId(recurringRuleId)) {
      throw new Error("Please enter a valid recurring rule ID");
    }

    await processRecurringTransactionService(
      new mongoose.Types.ObjectId(recurringRuleId),
    );

    console.log("Targeted recurring automation test completed.");
  } catch (error) {
    console.error("Automation test failed:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

runTest();