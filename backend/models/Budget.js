const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please enter userid!"],
  },
  category: {
    type: String,
    enum: [
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
    required: [true, "Please chooise any one category values!"],
  },
  limit: {
    type: Number,
    required: [true, "Please enter limit amount!"],
    min: [0.01, "Budget limit must be greater than zero"],
  },
  month: {
    type: Date,
    default: Date.now,
  },
});

budgetSchema.index(
  {
    userId: 1,
    category: 1,
    month: 1,
  },
  {
    unique: true,
  },
);

const BudgetModel = mongoose.model("Budget", budgetSchema);

module.exports = { BudgetModel };
