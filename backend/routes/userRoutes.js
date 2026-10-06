const express=require("express");
const routes=express.Router();
const {registerUser,loginUser}=require("../controllers/userController");
//register user routes

routes.post("/register",registerUser);
routes.post("/login",loginUser);

module.exports=routes;