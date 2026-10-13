
const express=require("express");

const routes=express.Router();

const {authenticateUser}=require("../middileware/authMeddileware");

const {
    createBudget,
    getBudgets,
    compareBudget,
    updateBudget,
    deleteBudget
}=require("../controllers/budgetContoller");

routes.use(authenticateUser);
//1.create budget
routes.post("/budget",createBudget);

//2.get budget information
routes.get("/budget",getBudgets);

//3.Get all budget and actual spending values
routes.get("/budget/compare",compareBudget);

//4.Update routes
routes.put("/budget",updateBudget);

//5.delte routes
routes.delete("/budget/:budgetId",deleteBudget);

module.exports=routes;