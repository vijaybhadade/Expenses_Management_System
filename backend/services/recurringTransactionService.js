const { RecurringModel } = require("../models/RecurringTransaction");
const mongoose = require("mongoose");
// 1. Create RecurringTransaction
const createRecurringTransactionService = async ({
  userId,
  amount,
  type,
  category,
  description,
  frequency,
  startDate,
  endDate,
  nextDueDate,
}) => {
  const num = Number(amount);
  const typeAllow = ["income", "expense"];
  const allowIncome = [
    "Salary",
    "Freelance",
    "Business",
    "Investment",
    "Scholarship",
    "Gift",
  ];

  const allowExpense = [
    "Food & Dining",
    "Groceries",
    "Transportation",
    "Housing & Rent",
    "Utilities",
    "Healthcare",
    "Shopping",
    "Entertainment",
    "Education",
    "Personal Care",
    "Travel",
    "EMI & Loans",
    "Insurance",
    "Family & Gifts",
  ];

  const allowFrequency = ["daily", "weekly", "monthly", "yearly"];

  if (
    isNaN(num) ||
    !type ||
    !category ||
    !frequency ||
    !startDate ||
    !nextDueDate
  ) {
    const error = new Error(
      "Please enter values in fields: amount, type, category, frequency, startDate, nextDueDate",
    );
    error.statusCode = 400;
    throw error;
  }

  if (!Number.isFinite(num) || num <= 0) {
    const error = new Error("Amount must be greater than zero!");
    error.statusCode = 400;
    throw error;
  }

  if (typeof type !== "string" || type.trim() === "") {
    const error = new Error("Type must not be empty!");
    error.statusCode = 400;
    throw error;
  }

  if (typeof category !== "string" || category.trim() === "") {
    const error = new Error("Category must not be empty!");
    error.statusCode = 400;
    throw error;
  }

  if (!typeAllow.includes(type)) {
    const error = new Error("Please enter valid values into type!");
    error.statusCode = 400;
    throw error;
  }

  if (type === "income" && !allowIncome.includes(category)) {
    const error = new Error("Please enter valid values into category!");
    error.statusCode = 400;
    throw error;
  }

  if (type === "expense" && !allowExpense.includes(category)) {
    const error = new Error("Please enter valid values into category!");
    error.statusCode = 400;
    throw error;
  }

  if (
    typeof frequency !== "string" ||
    frequency.trim() === "" ||
    !allowFrequency.includes(frequency)
  ) {
    const error = new Error("Frequency must not be empty!");
    error.statusCode = 400;
    throw error;
  }

  const dateParse = new Date(startDate);
  if (isNaN(dateParse.getTime())) {
    const error = new Error("Please enter valid values into startDate!");
    error.statusCode = 400;
    throw error;
  }

  const nextDueDateParse = new Date(nextDueDate);
  if (isNaN(nextDueDateParse.getTime())) {
    const error = new Error("Please enter valid values into nextDueDate!");
    error.statusCode = 400;
    throw error;
  }

  let endDateParse;
  if (endDate) {
    endDateParse = new Date(endDate);
    if (isNaN(endDateParse.getTime())) {
      const error = new Error("Please enter valid values into endDate!");
      error.statusCode = 400;
      throw error;
    }
  }

  if (nextDueDateParse < dateParse) {
    const error = new Error(
      "Next due date must not be earlier than start date!",
    );
    error.statusCode = 400;
    throw error;
  }

  if (endDateParse && endDateParse < dateParse) {
    const error = new Error("End date must not be earlier than start date!");
    error.statusCode = 400;
    throw error;
  }

  if (endDateParse && nextDueDateParse > endDateParse) {
    const error = new Error("Next due date must not be later than end date!");
    error.statusCode = 400;
    throw error;
  }

  const createRecurring = await RecurringModel.create({
    userId,
    amount: num,
    type,
    category,
    frequency,
    startDate: dateParse,
    nextDueDate: nextDueDateParse,
    description,
    endDate: endDateParse,
  });

  return createRecurring;
};

// 2. Get All RecurringTransaction
const getRecurringTransactionService = async ({ userId }) => {
  const getResult = await RecurringModel.find({ userId });
  return getResult;
};

// 3. Get RecurringTransaction By Id
const getRecurringTransactionByIdService = async ({ userId, id }) => {
  if (!id) {
    const error = new Error("Please enter id values!");
    error.statusCode = 400;
    throw error;
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Given id invalid format!");
    error.statusCode = 400;
    throw error;
  }

  const result = await RecurringModel.findOne({ _id: id, userId });
  return result;
};


// 4. Update RecurringTransaction By Id
const updateRecurringTransactionService = async ({
  amount,
  type,
  category,
  description,
  frequency,
  startDate,
  nextDueDate,
  endDate,
  isActive,
  userId,
  id,
}) => {
 
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid ID format!");
    error.statusCode = 400;
    throw error;
  }

 
  const existingRecord = await RecurringModel.findOne({ _id: id, userId });
  if (!existingRecord) {
    const error = new Error("Recurring transaction not found!");
    error.statusCode = 404;
    throw error;
  }

  
  const updatedFields = {};

  if (amount !== undefined) {
    const num = Number(amount);
    if (!Number.isFinite(num) || num <= 0) {
      const error = new Error("Amount must be greater than zero!");
      error.statusCode = 400;
      throw error;
    }
    updatedFields.amount = num;
  }

  if (type !== undefined) {
    if (typeof type !== "string" || type.trim() === "") {
      const error = new Error("Type must not be empty!");
      error.statusCode = 400;
      throw error;
    }
    const typeAllow = ["income", "expense"];
    if (!typeAllow.includes(type)) {
      const error = new Error("Please enter valid values into type!");
      error.statusCode = 400;
      throw error;
    }
    updatedFields.type = type;
  }

  if (category !== undefined) {
    if (typeof category !== "string" || category.trim() === "") {
      const error = new Error("Category must not be empty!");
      error.statusCode = 400;
      throw error;
    }
    updatedFields.category = category;
  }

  if (frequency !== undefined) {
    const allowFrequency = ["daily", "weekly", "monthly", "yearly"];
    if (
      typeof frequency !== "string" ||
      frequency.trim() === "" ||
      !allowFrequency.includes(frequency)
    ) {
      const error = new Error("Frequency must not be empty or invalid!");
      error.statusCode = 400;
      throw error;
    }
    updatedFields.frequency = frequency;
  }

  if (startDate !== undefined) {
    const startDateParse = new Date(startDate);
    if (isNaN(startDateParse.getTime())) {
      const error = new Error("Please enter valid values into startDate!");
      error.statusCode = 400;
      throw error;
    }
    updatedFields.startDate = startDateParse;
  }

  if (nextDueDate !== undefined) {
    const nextDueDateParse = new Date(nextDueDate);
    if (isNaN(nextDueDateParse.getTime())) {
      const error = new Error("Please enter valid values into nextDueDate!");
      error.statusCode = 400;
      throw error;
    }
    updatedFields.nextDueDate = nextDueDateParse;
  }

  if (endDate !== undefined) {
    if (endDate === null) {
      updatedFields.endDate = null;
    } else {
      const endDateParse = new Date(endDate);
      if (isNaN(endDateParse.getTime())) {
        const error = new Error("Please enter valid values into endDate!");
        error.statusCode = 400;
        throw error;
      }
      updatedFields.endDate = endDateParse;
    }
  }

  if (description !== undefined) {
    if (typeof description !== "string") {
      const error = new Error("Description must be a string!");
      error.statusCode = 400;
      throw error;
    }
    updatedFields.description = description;
  }

  if (isActive !== undefined) {
    if (typeof isActive !== "boolean") {
      const error = new Error("isActive must be a boolean value!");
      error.statusCode = 400;
      throw error;
    }
    updatedFields.isActive = isActive;
  }

  
  if (Object.keys(updatedFields).length === 0) {
    const error = new Error("Please provide at least one field to update!");
    error.statusCode = 400;
    throw error;
  }

  
  const effectiveType =
    updatedFields.type !== undefined ? updatedFields.type : existingRecord.type;
  const effectiveCategory =
    updatedFields.category !== undefined
      ? updatedFields.category
      : existingRecord.category;

  const allowIncome = [
    "Salary",
    "Freelance",
    "Business",
    "Investment",
    "Scholarship",
    "Gift",
  ];

  const allowExpense = [
    "Food & Dining",
    "Groceries",
    "Transportation",
    "Housing & Rent",
    "Utilities",
    "Healthcare",
    "Shopping",
    "Entertainment",
    "Education",
    "Personal Care",
    "Travel",
    "EMI & Loans",
    "Insurance",
    "Family & Gifts",
  ];

  if (effectiveType === "income" && !allowIncome.includes(effectiveCategory)) {
    const error = new Error("Please enter valid values into category!");
    error.statusCode = 400;
    throw error;
  }

  if (effectiveType === "expense" && !allowExpense.includes(effectiveCategory)) {
    const error = new Error("Please enter valid values into category!");
    error.statusCode = 400;
    throw error;
  }

  
  const effectiveStartDate =
    updatedFields.startDate !== undefined
      ? updatedFields.startDate
      : existingRecord.startDate;
  const effectiveNextDueDate =
    updatedFields.nextDueDate !== undefined
      ? updatedFields.nextDueDate
      : existingRecord.nextDueDate;
  const effectiveEndDate =
    updatedFields.endDate !== undefined
      ? updatedFields.endDate
      : existingRecord.endDate;

  if (effectiveNextDueDate < effectiveStartDate) {
    const error = new Error(
      "Next due date must not be earlier than start date!",
    );
    error.statusCode = 400;
    throw error;
  }

  if (effectiveEndDate !== null && effectiveEndDate !== undefined) {
    if (effectiveEndDate < effectiveStartDate) {
      const error = new Error("End date must not be earlier than start date!");
      error.statusCode = 400;
      throw error;
    }
    if (effectiveNextDueDate > effectiveEndDate) {
      const error = new Error("Next due date must not be later than end date!");
      error.statusCode = 400;
      throw error;
    }
  }

  
  const getUpdated = await RecurringModel.findOneAndUpdate(
    { _id: id, userId },
    {
      $set: updatedFields,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!getUpdated) {
    const error = new Error("Recurring transaction not found or could not be updated!");
    error.statusCode = 404;
    throw error;
  }

  return getUpdated;
};

// 5. Delete RecurringTransaction
const deleteRecurringTransactionService = async ({ userId,id }) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid ID format!");
    error.statusCode = 400;
    throw error;
  }

 
  const existingRecord = await RecurringModel.findOne({ _id: id, userId });
  if (!existingRecord) {
    const error = new Error("Recurring transaction not found!");
    error.statusCode = 404;
    throw error;
  }
  
  const deletedRecord=await RecurringModel.findOneAndDelete({_id:id,userId});
  return deletedRecord;
};

module.exports = {
  createRecurringTransactionService,
  getRecurringTransactionService,
  getRecurringTransactionByIdService,
  updateRecurringTransactionService,
  deleteRecurringTransactionService,
};
