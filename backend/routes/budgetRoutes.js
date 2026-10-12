



const express=require("express");

const routes=express.Router();

const {authenticateUser}=require("../middileware/authMeddileware");

const {createBudget,getBudgets}=require("../controllers/budgetContoller");

routes.use(authenticateUser);
//create budget
routes.post("/budget",createBudget);

//get budget information
routes.get("/budget",getBudgets);

module.exports=routes;