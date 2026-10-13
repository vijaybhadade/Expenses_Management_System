
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
routes.get('/income/:id',getIncomeById);

//4.Update income
routes.patch("/income/:id",updateIncome);

//5.Delete income
routes.delete("/delete/:id",deleteIncome);

module.exports=routes;