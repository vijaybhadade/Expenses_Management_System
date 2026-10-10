const express=require("express");
const routes=express.Router();
const {createExpenses,
    getAllExpense,
    getSingleExpense,
    updateSingleExpense,
    deleteSingleExpense,
    getExpenseStats,
    getCategoryStats,
     getRecentExpenses
}=require("../controllers/expenseController");
const {authenticateUser}=require("../middileware/authMeddileware");

routes.use(authenticateUser);

//1.create Expense 
routes.post("/expenses",createExpenses);

// 2. Get all expenses (pagination and filters)
routes.get("/expenses",getAllExpense);


// 3. Overall expense statistics
routes.get("/expenses/stats",getExpenseStats);

// 4. Category-wise statistics
routes.get("/expenses/category", getCategoryStats);

// 5. Recent expenses
routes.get("/expenses/recent", getRecentExpenses);

// 6. Get one expense by ID
routes.get("/expenses/:expenseId", getSingleExpense);

// 7. Update one expense
routes.put("/expenses/:expenseId", updateSingleExpense);

// 8. Delete one expense
routes.delete("/expenses/:expenseId", deleteSingleExpense);


module.exports=routes;      