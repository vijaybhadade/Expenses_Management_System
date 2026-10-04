const express=require("express");
const dotenv=require("dotenv");
dotenv.config();
const app=express();
const cors=require("cors");
const helmet=require("helmet");
const morgan=require("morgan");
const database=require("./config/db");
const {User} = require("./models/User");

const PORT=process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/",(req,res)=>{

    res.send("Welcome to Root page!");
});


app.post("/test",async(req,res)=>{
   const {name,email,password}= req.body;
   const newUser= new User({
    name:name,
    email:email,
    password:password
   });
  await  newUser.save();
   res.status(201).json({
    success:true,
    message:"User added successfully..."
   });
});

const executeServer=async()=>{
   try{
    await database();

   app.listen(PORT,()=>{
        console.log(`Server is running on ${PORT} port`);
    });

   }catch(error)
   {
    console.error("Internal server Error");
    throw error;
   }
}
executeServer();