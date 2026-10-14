const express= require("express");
const routes=express.Router();

const {authenticateUser}=require("../middileware/authMeddileware");
const { getTransaction } = require("../controllers/transactionController");
routes.use(authenticateUser);

//1.Get transactions details

routes.get("/transactions",getTransaction);


module.exports=routes;