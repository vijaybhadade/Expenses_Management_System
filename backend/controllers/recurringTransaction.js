const {
  createRecurringTransactionService,
  getRecurringTransactionService,
  getRecurringTransactionByIdService,
  updateRecurringTransactionService,
  deleteRecurringTransactionService,
} = require("../services/recurringTransactionService");

//1.create recurringTransaction
const createRecurringTransaction = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const {
      amount,
      type,
      category,
      description,
      frequency,
      startDate,
      endDate,
      nextDueDate,
    } = req.body;

    const Recurring = await createRecurringTransactionService({
      userId,
      amount,
      type,
      category,
      description,
      frequency,
      startDate,
      endDate,
      nextDueDate,
    });

    res.status(201).json({
      success: true,
      message: "Create recurringTransaction successfully..",
      Recurring,
    });
  } catch (error) {
    next(error);
  }
};

//2.Get all recurringTransaction
const getRecurringTransaction = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const result = await getRecurringTransactionService({ userId });

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

//3.Get recurringTransaction by Id
const getRecurringTransactionById = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const result = await getRecurringTransactionByIdService({ userId, id });
    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

//4.update recurringTransaction by Id
const updateRecurringTransaction = async (req,res,next) => {
  try{
    const { userId } = req.user;
  const { id } = req.params;
  const {
    amount,
    type,
    category,
    description,
    frequency,
    startDate,
    nextDueDate,
    endDate,
    isActive
  } = req.body;

  const updates= await updateRecurringTransactionService({
    amount,
    type,
    category,
    description,
    frequency,
    startDate,
    nextDueDate,
    endDate,
    isActive,
    userId,
    id,
  });

  res.status(200).json({
    success:true,
    updates
  });
  }catch(error)
  {
    next(error);
  }
};

//5.Delete recurringTransaction using id
const deleteRecurringTransaction = async (req, res, next) => {
  try{
    const {userId}=req.user;
    const{id}=req.params;
    const result=await deleteRecurringTransactionService({userId,id});
    res.status(200).json({
      success:true,
      message:"deleted Recurring Transaction!",
      result
    });
  }catch(error)
  {
    next(error);
  }
};
module.exports = {
  createRecurringTransaction,
  getRecurringTransaction,
  getRecurringTransactionById,
  updateRecurringTransaction,
  deleteRecurringTransaction,
};
