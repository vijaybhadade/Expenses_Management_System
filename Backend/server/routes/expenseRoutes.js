const express=require("express");
const routes=express.Router();
const {createExpenses}=require("../controllers/expenseController");
const {authenticateUser}=require("../middileware/authMeddileware");

//create Expense 
routes.post("/expenses",authenticateUser,createExpenses);

//Get Expense
routes.get("/expreses",authenticateUser);


module.exports=routes;