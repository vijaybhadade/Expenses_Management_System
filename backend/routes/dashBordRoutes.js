

const express=require("express");

const routes=express.Router();

const {authenticateUser}=require("../middileware/authMeddileware");


const {
    getAllData,
    getRangeData
}=require("../controllers/dashBordController");

routes.get("/dashboard",authenticateUser,getAllData);

routes.get("/dashboard/range",authenticateUser,getRangeData);
module.exports=routes;