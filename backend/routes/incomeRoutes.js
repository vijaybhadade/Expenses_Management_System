
const express=require("express");

const routes=express.Router();
const {createIncome,getIncome,getIncomeById,updateIncome,deleteIncome}=require("../controllers/incomeController");
const {authenticateUser}=require("../middileware/authMeddileware");

routes.use(authenticateUser);

//1.create income
routes.post("/income",createIncome);

//2.get list income with pagination
routes.get("/income",getIncome);

//3.get one income record
routes.get('/income/:incomeId',getIncomeById);

//4.Update income
routes.patch("/income/:incomeId",updateIncome);

//5.Delete income
routes.delete("/delete/:incomeId",deleteIncome);

module.exports=routes;