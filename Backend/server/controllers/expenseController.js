const {createExpenseService}= require("../services/expenseService");

//CreateExpenses

const createExpenses= async(req,res)=>{
  const {amount,category,description}=req.body;
   try{
    const{userId}=req.user;
   const createdExpense= await createExpenseService({amount,category,description,userId});

    res.status(201).json({
       success:true,
       message:"New expenses created!",
       createdExpense
    });
   }catch(error)
   {
    const statusCode=error.statusCode || 500;
    res.status(statusCode).json({
        success:false,
        message:error.message || "Internal server error"
    });
   }
}

module.exports={createExpenses};