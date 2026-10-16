const mongoose = require("mongoose");

const recurringTransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      min: [0.01,"Amount values must be greater than zer"],
      required: [true, "Please enter amount!"],
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Please enter valide types values!"],
    },
    category: {
      type: String,
      enum: [
        "Salary",
        "Freelance",
        "Business",
        "Investment",
        "Scholarship",
        "Gift",
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
      ],
      required: [true, "Please enter a valid category value"],
    },
    description: {
      type: String,
      trim: true,
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      required: [true, "Please enter a valid frequency value"],
    },
    startDate: {
      type: Date,
      required: [true, "Please enter startDate of recurring transaction!"],
      default: Date.now,
    },
    nextDueDate: {
      type: Date,
      required: [true, "Please enter nextDueDate value"],
    },
    endDate: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isMonthEnd:{
      type:Boolean,
      default:false,
    },
  },
  {
    timestamps: true,
  },
);

const RecurringModel = mongoose.model(
  "RecurringTransaction",
  recurringTransactionSchema,
);

module.exports = { RecurringModel };
