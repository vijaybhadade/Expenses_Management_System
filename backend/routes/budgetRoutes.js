



const express=require("express");

const routes=express.Router();

const {authenticateUser}=require("../middileware/authMeddileware");

const {
    createBudget,
    getBudgets,
    updateBudget,
    deleteBudget
}=require("../controllers/budgetContoller");

routes.use(authenticateUser);
//1.create budget
routes.post("/budget",createBudget);

//2.get budget information
routes.get("/budget",getBudgets);

//3.Update routes
routes.put("/budget",updateBudget);

//4.delte routes
routes.delete("/budget/:budgetId",deleteBudget);

module.exports=routes;