const { IncomeModel } = require("../models/Income");
const mongoose = require("mongoose");

const allowSource = [
  "Salary",
  "Freelance",
  "Business",
  "Investment",
  "Scholarship",
  "Gift",
];

//1.Create income Service
const createIncomeServices = async ({
  userId,
  amount,
  source,
  description,
  date,
}) => {
  const num = Number(amount);

  if (!amount || !Number.isFinite(num) || num < 1) {
    const error = new Error(
      "Please enter amount and amount must be greater than 0",
    );
    error.statusCode = 400;
    throw error;
  }

  if (!source || !allowSource.includes(source)) {
    const error = new Error("Please enter valid values inside source!");
    error.statusCode = 400;
    throw error;
  }

  const dateParse = date ? new Date(date) : new Date();
  if (isNaN(dateParse.getTime())) {
    const error = new Error("Please enter valid values into date!");
    error.statusCode = 400;
    throw error;
  }

  try {
    const income = await IncomeModel.create({
      userId,
      amount: num,
      source,
      description,
      date: dateParse,
    });
    return income;
  } catch (error) {
    if (error.name === "ValidationError") {
      error.statusCode = 400;
    }
    throw error;
  }
};


//2.getAllincomeService
const getIncomeServices = async ({ userId, page, limit }) => {
  const skip = (page - 1) * limit;

  const getIncome = await IncomeModel.find({ userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalIncome = await IncomeModel.countDocuments({ userId });

  const totalPages = Math.ceil(totalIncome / limit);
  return { income: getIncome, totalIncome, currentPage: page, totalPages };
};

const getIncomeByIdServices = async ({ userId, incomeId }) => {
  if (!incomeId) {
    const error = new Error("Please enter incomeId values!");
    error.statusCode = 400;
    throw error;
  }
  if (!mongoose.Types.ObjectId.isValid(incomeId)) {
    const error = new Error("Given incomeId invalid format!");
    error.statusCode = 400;
    throw error;
  }
  const income = await IncomeModel.findOne({ userId, _id: incomeId });
  if (!income) {
    const error = new Error("Record does not exists");
    error.statusCode = 404;
    throw error;
  }
  return income;
};

//3.update income service
const updateIncomeServices = async ({
  userId,
  incomeId,
  amount,
  source,
  description,
  date,
}) => {
  if (!incomeId) {
    const error = new Error("Please enter incomeId values!");
    error.statusCode = 400;
    throw error;
  }

  if (!mongoose.Types.ObjectId.isValid(incomeId)) {
    const error = new Error("Given incomeId invalid format!");
    error.statusCode = 400;
    throw error;
  }

  const updateFields = {};

  if (amount !== undefined && amount !== null && amount !== "") {
    const num = Number(amount);
    if (!Number.isFinite(num) || num < 1) {
      const error = new Error("Amount must be greater than 0");
      error.statusCode = 400;
      throw error;
    }
    updateFields.amount = num;
  }

  if (source !== undefined && source !== null && source !== "") {
    if (!allowSource.includes(source)) {
      const error = new Error("Please enter valid values inside source!");
      error.statusCode = 400;
      throw error;
    }
    updateFields.source = source;
  }

  if (description !== undefined) {
    updateFields.description = description;
  }

  if (date !== undefined && date !== null && date !== "") {
    const dateParse = new Date(date);
    if (isNaN(dateParse.getTime())) {
      const error = new Error("Please enter valid values into date!");
      error.statusCode = 400;
      throw error;
    }
    updateFields.date = dateParse;
  }

  if (
    amount === undefined &&
    source === undefined &&
    description === undefined &&
    date === undefined
  ) {
    const error = new Error("Please provide at least one field to update!");
    error.statusCode = 400;
    throw error;
  }

  if (Object.keys(updateFields).length === 0) {
    const error = new Error(
      "Please provide at least one valid field to update!",
    );
    error.statusCode = 400;
    throw error;
  }

  const updatedIncome = await IncomeModel.findOneAndUpdate(
    { _id: incomeId, userId },
    { $set: updateFields },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedIncome) {
    const error = new Error("Income record does not exist");
    error.statusCode = 404;
    throw error;
  }

  return updatedIncome;
};

//4.Delete income Service
const deleteIncomeServices = async ({ userId, incomeId }) => {
  if (!incomeId) {
    const error = new Error("Please enter incomeId values!");
    error.statusCode = 400;
    throw error;
  }

  if (!mongoose.Types.ObjectId.isValid(incomeId)) {
    const error = new Error("Given incomeId invalid format!");
    error.statusCode = 400;
    throw error;
  }

  const deletedIncome = await IncomeModel.findOneAndDelete({
    _id: incomeId,
    userId,
  });

  if (!deletedIncome) {
    const error = new Error("Income record does not exist");
    error.statusCode = 404;
    throw error;
  }

  return deletedIncome;
};

module.exports = {
  createIncomeServices,
  getIncomeServices,
  getIncomeByIdServices,
  updateIncomeServices,
  deleteIncomeServices,
};