

const express=require("express");

const routes=express.Router();

const {authenticateUser}=require("../middileware/authMeddileware");

routes.use(authenticateUser);
const {
    getAllData,
    getRangeData
}=require("../controllers/dashBordController");

routes.get("/dashboard",getAllData);

routes.get("/dashboard/range",getRangeData);
module.exports=routes;