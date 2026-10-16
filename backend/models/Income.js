const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required:true
    },
     recurringRuleId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"RecurringTransaction"
     },
     scheduleOccuredDate:{
      type: Date,
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
//this is  unique complex index 
incomeSchema.index({
  recurringRuleId:1,
  scheduleOccuredDate:1
},
{
  unique:true,
  partialFilterExpression:{
    recurringRuleId:{$type:"objectId"},
    scheduleOccuredDate:{$type:Date}
  }
}
);

const IncomeModel=mongoose.model("Income",incomeSchema);

module.exports={IncomeModel};
