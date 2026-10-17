const cron = require("node-cron");
const {
  processRecurringTransactionService,
} = require("./recurringTransactionAutomationService");

const startRecurringScheduler = () => {
  // Runs every minute
  const recurringTask = cron.schedule("* * * * *", async () => {
    try {
      console.log("Recurring automation started...");
      await processRecurringTransactionService();
      console.log("Recurring automation completed.");
    } catch (error) {
      console.error("Recurring automation failed:", error.message);
    }
  });

  return recurringTask;
};

module.exports = { startRecurringScheduler };