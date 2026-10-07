const express=require("express");
const dotenv=require("dotenv");
dotenv.config();
const app=express();
const cors=require("cors");
const helmet=require("helmet");
const morgan=require("morgan");
const database=require("./config/db");
const userRoutes=require("./routes/userRoutes");
const expenseRoutes=require("./routes/expenseRoutes");
const {errorHandle}=require("./middileware/errorHandler");

const PORT=process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use("/api",userRoutes);
app.use("/api",expenseRoutes);
app.use(errorHandle);

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