
require("dotenv").config();

const mongoose = require("mongoose");
const database = require("./config/db");

const {
  processRecurringTransactionService,
} = require("./services/recurringTransactionAutomationService");

const runTest = async () => {
  try {
    await database();

    const recurringRuleId = "6ad33a4d91a3b0ee49552f3d";

    if (!mongoose.isValidObjectId(recurringRuleId)) {
      throw new Error("Invalid recurring rule ID");
    }

   
    

    await processRecurringTransactionService(
      new mongoose.Types.ObjectId(recurringRuleId)
    );

    console.log("Recurring income automation test completed.");
  } catch (error) {
    console.error("Test failed:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

runTest();
