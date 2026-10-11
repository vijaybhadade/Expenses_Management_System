
const{createBudgetService}=require("../services/budgetService");



const createBudget=async(req,res,next)=>{
try{
    const{category,limit,month}=req.body;
    const{userId}=req.user;

    const {createdBudget}=await createBudgetService({userId,category,limit,month});

    res.status(201).json({
        success:true,
        message:"Budget created successfully..",
        createdBudget
    });

}catch(error)
{
    next(error);
}
}


module.exports= {createBudget};