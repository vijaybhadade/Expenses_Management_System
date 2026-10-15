const express = require("express");
const routes = express.Router();

const { authenticateUser } = require("../middileware/authMeddileware");
routes.use(authenticateUser);

const {
  createRecurringTransaction,
  getRecurringTransaction,
  getRecurringTransactionById,
  updateRecurringTransaction,
  deleteRecurringTransaction
} = require("../controllers/recurringTransaction");

//1.Create recurringTransaction
routes.post("/recurring-transactions", createRecurringTransaction);
 
//2.Get recurringTransaction
routes.get("/recurring-transactions", getRecurringTransaction);

//3.Get recurringTransaction by id
routes.get("/recurring-transactions/:id", getRecurringTransactionById);

//3.update recurringTransaction using :id
routes.patch("/recurring-transactions/:id", updateRecurringTransaction);

//4.delete recurringTransaction using :id
routes.delete("/recurring-transactions/:id", deleteRecurringTransaction);


module.exports=routes;