const express=require("express");
const routes=express.Router();
const {createExpenses}=require("../controllers/expenseController");
const {getAllExpense}=require("../controllers/expenseController");
const {authenticateUser}=require("../middileware/authMeddileware");

//create Expense 
routes.post("/expenses",authenticateUser,createExpenses);

//Get Expense
routes.get("/expenses",authenticateUser,getAllExpense);

//Get Expense with id

routes.get("/expenses/:id",authenticateUser);


module.exports=routes;