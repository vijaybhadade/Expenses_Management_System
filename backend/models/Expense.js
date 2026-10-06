const mongoose= require("mongoose");

const expenseSchema= new mongoose.Schema({
 userId:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"User"
 },
 amount:{
    type:Number,
    required:[true,"Please enter amount value!"]
 },
 category:{
    type:String,
    enum:["Food","Fashion","Equipment","Electronics"],
    required:[true,"Please choose any one options!"]
 },
 description:{
    type:String,
 },
 date:{
    type:Date,
    required:[true,"Please add date"],
    default:Date.now,
 }
});

const ExpenseModel= mongoose.model("Expense",expenseSchema);

module.exports={ExpenseModel};