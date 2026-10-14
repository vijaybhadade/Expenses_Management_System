const { getTransactionServices } = require("../services/transactionService");

const getTransaction = async (req, res, next) => {
  try {
    const { userId } = req.user;
    
    const { page = 1, limit = 10, type = "all" } = req.query;
    
    const typeValue = ["all", "income", "expenses"];
    const numPage = Number(page);
    const numLimit = Number(limit);

    if (!Number.isInteger(numPage) || numPage < 1) {
      return res.status(400).json({
        success: false,
        message: "Page must be a positive integer greater than 0",
      });
    }

    if (!Number.isInteger(numLimit) || numLimit < 1 || numLimit > 100) {
      return res.status(400).json({
        success: false,
        message: "Limit must be a positive integer greater than 0 and maximum limit should be 100",
      });
    }

   //check if enter types value string then trim and conver into lowerCase otherwise ""
    const normalizedType = typeof type === "string" ? type.trim().toLowerCase() : "";
    
    //check enter normalizedType does not exists then return response.
    if (!typeValue.includes(normalizedType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction type. Allowed values are 'all', 'income', or 'expenses'.",
      });
    }

    const result = await getTransactionServices({
      userId,
      page: numPage,
      limit: numLimit,
      type: normalizedType,
    });

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTransaction };