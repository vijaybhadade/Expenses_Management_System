const express=require("express");
const routes=express.Router();
const {createExpenses,
    getAllExpense,
    getSingleExpense,
    updateSingleExpense,
    deleteSingleExpense
}=require("../controllers/expenseController");
const {authenticateUser}=require("../middileware/authMeddileware");

//create Expense 
routes.post("/expenses",authenticateUser,createExpenses);

//Get Expense
routes.get("/expenses",authenticateUser,getAllExpense);

//Get Expense with id
routes.get("/expenses/:expenseId",authenticateUser,getSingleExpense);

//Update Expense with id
routes.put("/expenses/:expenseId",authenticateUser,updateSingleExpense);


//Delete Expense with id
routes.delete("/expenses/:expenseId",authenticateUser,deleteSingleExpense);


module.exports=routes;      