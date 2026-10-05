const express=require("express");
const routes=express.Router();
const {registerUser,loginUser}=require("../controllers/userController");
const {authenticateUser}= require("../middileware/authMeddileware");
//register user routes

routes.post("/register",registerUser);
routes.post("/login",loginUser);
routes.get("/expenses",authenticateUser,(req,res)=>{
    res.send("Welcome  to expenses root page!");
});

module.exports=routes;