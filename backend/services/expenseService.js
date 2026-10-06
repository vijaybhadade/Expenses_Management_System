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
const getAllExpenseService=async({userId})=>{
  const expenses= await ExpenseModel.find({userId});
     return expenses;   
}

//Get Expenses by id
const getExpenseByIdService=async({expenseId,userId})=>{
    const getExpenseById=await ExpenseModel.findOne({_id:expenseId,userId});
    return getExpenseById;
}

//Update Expenses by id
const getUpdatedExpenseByIdService=async({expenseId,userId,updateData})=>{
    const{amount,category,description}=updateData;
  const expense=await ExpenseModel.findOneAndUpdate({_id:expenseId,userId},{amount,category,description},{new: true});
  return expense;
}

//Delete Expenses by id 
const getDeletedExpenseByIdService=async({expenseId,userId})=>{
    const expense=await ExpenseModel.findOneAndDelete({_id:expenseId,userId});
    return expense;
}



module.exports= 
{
    createExpenseService,
    getAllExpenseService,
    getExpenseByIdService,
    getUpdatedExpenseByIdService,
     getDeletedExpenseByIdService
};