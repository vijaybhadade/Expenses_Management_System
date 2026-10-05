const {ExpenseModel}=require("../models/Expense");

//CreateExpenses
const createExpenseService=async({amount,category,description,userId})=>{
    if(!amount || !category ){
     const error= new Error("Missing required expense fields: amount, category.");
     error.statusCode=400;
     throw error;
    }
    try{
      const createdExpense=await  ExpenseModel.create({
        amount,category,description,userId
    });

    return createdExpense;
    }catch(error){
        if(error.name==="ValidationError")
        {
            error.statusCode=400;
        }
        throw error;
    }
   
}

//Get All Expenses
const getAllExpenses=async()=>{

    const fetch=await User.find();

    
}

module.exports= {createExpenseService};