const express=require("express");
const routes=express.Router();
const {registerUser}=require("../controllers/userController");
//register user routes

routes.post("/register",registerUser);
routes.get("/",(req,res)=>{
    res.send("Welcome to home page!");
});

module.exports=routes;