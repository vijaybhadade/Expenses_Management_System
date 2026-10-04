const express=require("express");
const dotenv=require("dotenv");
dotenv.config();
const app=express();
const cors=require("cors");
const helmet=require("helmet");
const morgan=require("morgan");
const database=require("./config/db");
const userRoutes=require("./routes/userRoutes");

const PORT=process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api",userRoutes);

app.get("/",(req,res)=>{

    res.send("Welcome to Root page!");
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