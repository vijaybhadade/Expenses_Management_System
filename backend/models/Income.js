const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required:true
    },
    amount: {
      type: Number,
      min: 1,
      required: [true, "Amount must be greater than zero"],
    },
    source: {
      type: String,
      enum: [
        "Salary",
        "Freelance",
        "Business",
        "Investment",
        "Scholarship",
        "Gift",
      ],
      required: [true, "Please enter valide values into source!"],
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      required:[true,"Please add date"],
      default:Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const IncomeModel=mongoose.model("Income",incomeSchema);

module.exports={IncomeModel};
