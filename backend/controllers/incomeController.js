const {
    createIncomeServices,
    getIncomeServices,
    getIncomeByIdServices,
    updateIncomeServices,
    deleteIncomeServices
}=require("../services/incomeService");

const createIncome=async (req,res,next) => {
   try{
    const {userId}=req.user;
   const {amount,source,description,date}=req.body;

   const income= await createIncomeServices({userId,amount,source,description,date});
   res.status(201).json({
    sucess:true,
    message:"Create income successfull..",
    "income":income
   });
   }catch(error)
   {
    next(error);
   }
};

const getIncome=async(params)=>{

};

const getIncomeById=async(params)=>{

}

const updateIncome=async(params)=>{

};

const deleteIncome=async(params)=>{

};

module.exports={
    createIncome,
    getIncome,
    getIncomeById,
    updateIncome,
    deleteIncome};

