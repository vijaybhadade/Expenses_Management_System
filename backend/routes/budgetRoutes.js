



const express=require("express");

const routes=express.Router();

const {authenticateUser}=require("../middileware/authMeddileware");

const {createBudget}=require("../controllers/budgetContoller");

routes.use(authenticateUser);
routes.post("/budget",createBudget);

module.exports=routes;