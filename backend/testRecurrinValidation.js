
const { RecurringModel } = require("./models/RecurringTransaction");

const baseData = {
  userId: "6acbd9971db662130d148dee",
  amount: 100,
  frequency: "daily",
  nextDueDate: new Date(),
};

async function checkValidation(name, data, shouldPass, expectedField) {
  try {
    const doc = new RecurringModel(data);
    await doc.validate();

    if (shouldPass) {
      console.log(`PASS: ${name}`);
    } else {
      console.error(`FAIL: ${name} — expected validation to fail`);
    }
  } catch (error) {
    const fieldFailed =
      expectedField && error.errors?.[expectedField];

    if (!shouldPass && fieldFailed) {
      console.log(`PASS: ${name} — rejected as expected`);
    } else {
      console.error(`FAIL: ${name}: ${error.message}`);
    }
  }
}

async function testRecurringTransactions() {
  await checkValidation(
    "Valid income",
    { ...baseData, type: "income", source: "Salary" },
    true
  );

  await checkValidation(
    "Income missing source",
    { ...baseData, type: "income" },
    false,
    "source"
  );

  await checkValidation(
    "Valid expense",
    { ...baseData, type: "expense", category: "Food & Dining" },
    true
  );

  await checkValidation(
    "Expense missing category",
    { ...baseData, type: "expense" },
    false,
    "category"
  );
}

testRecurringTransactions().catch(console.error);
