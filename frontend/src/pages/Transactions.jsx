import { useState } from "react";
import {
  MoveUp,
  Star,
  Wallet,
  FileSpreadsheet
} from "lucide-react";

const colorClasses = {
  red: { text: "text-red-500", bg: "bg-red-50" },
  blue: { text: "text-blue-500", bg: "bg-blue-50" },
  yellow: { text: "text-amber-500", bg: "bg-amber-50" },
  green: { text: "text-green-500", bg: "bg-green-50" },
};

const Transactions = () => {
  // Filter states
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  // Form input states
  const [formCategory, setFormCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [expenseDetails, setExpenseDetails] = useState([
    {
      id: "200",
      date: "28 Oct 2026",
      category: "Food & Dining",
      description: "Groceries",
      amount: "₹1,250",
      action: "..."
    },
    {
      id: "201",
      date: "27 Oct 2026",
      category: "Groceries",
      description: "Monthly Groceries",
      amount: "₹2,350",
      action: "..."
    },
    {
      id: "202",
      date: "26 Oct 2026",
      category: "Utilities",
      description: "Electricity bill",
      amount: "₹1,800",
      action: "..."
    },
  ]);

  // Handle search input
  const handleInput = (e) => {
    setSearchText(e.target.value);
  };

  // Handle form submission
  const handleSubmitExpense = (e) => {
    e.preventDefault();

    // Format date from YYYY-MM-DD to DD MMM YYYY
    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    //validate number 
    if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
      return;
    }

    const newExpense = {
      id: String(Date.now()),
      date: formattedDate,
      category: formCategory,
      description: description || "No description",
      amount: `₹${Number(amount).toLocaleString("en-IN")}`,
      action: "..."
    };

    setExpenseDetails((prev) => [newExpense, ...prev]);

    // Reset form states
    setAmount("");
    setFormCategory("");
    setDate("");
    setDescription("");
  };

  // Handle cancel button
  const handleCancel = () => {
    setAmount("");
    setFormCategory("");
    setDate("");
    setDescription("");
  };

  const summaryCards = [
    {
      id: "100",
      title: "Total Expenses",
      amount: "₹14,750",
      icon: Wallet,
      color: "red",
      percentage: "6.7%",
      trend: MoveUp,
      trendColor: "red",
    },
    {
      id: "101",
      title: "This month",
      amount: "₹12,320",
      icon: MoveUp,
      color: "blue",
      percentage: "8.3%",
      trend: MoveUp,
      trendColor: "red",
    },
    {
      id: "102",
      title: "Largest Expense",
      amount: "₹3,980",
      icon: Star,
      color: "yellow",
      subject: "House & rent",
    },
    {
      id: "103",
      title: "Most used category",
      subject: "Food & Dining",
      icon: FileSpreadsheet,
      color: "green",
      percentage: "34% total expense"
    },
  ];

  // Filter transactions based on category and search
  const filteredExpenses = expenseDetails.filter((item) => {
    const matchedSearch = [item.date, item.category, item.description, item.amount]
      .some((val) => String(val).toLowerCase().includes(searchText.toLowerCase()));
    const matchedCategory = selectedCategory === "ALL" || item.category === selectedCategory;
    return matchedCategory && matchedSearch;
  });

  return (
    <>
      {/* Summary Cards */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map((item, index) => {
            const IconComponent = item.icon;
            const theme = colorClasses[item.color] || { text: "text-slate-600", bg: "bg-slate-100" };
            const TrendIcon = item.trend;

            return (
              <div
                key={item.id || index}
                className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-slate-500">{item.title}</span>
                  {IconComponent && (
                    <div className={`p-2 rounded-lg ${theme.bg}`}>
                      <IconComponent className={`w-5 h-5 ${theme.text}`} />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  {item.amount ? (
                    <span className="text-2xl font-bold text-slate-900">
                      {item.amount}
                    </span>
                  ) : (
                    <span className="text-lg font-semibold text-slate-900">
                      {item.subject}
                    </span>
                  )}

                  {item.percentage && (
                    <span className="text-sm text-slate-500 flex items-center gap-1">
                      {TrendIcon && <TrendIcon className={`w-4 h-4 ${colorClasses[item.trendColor]?.text || "text-slate-500"}`} />}
                      {item.percentage}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mx-6 mt-2 flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-6 bg-white py-3 rounded-md shadow-sm border border-slate-100">
        <input
          type="text"
          value={searchText}
          onChange={handleInput}
          placeholder="Search expenses..."
          className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500 md:max-w-sm"
        />

        <div className="flex flex-wrap gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border cursor-pointer border-slate-300 px-3 py-2 bg-white outline-none"
          >
            <option value="ALL">All Categories</option>
            <option value="Food & Dining">Food & Dining</option>
            <option value="Groceries">Groceries</option>
            <option value="Transportation">Transportation</option>
            <option value="Housing & Rent">Housing &amp; Rent</option>
            <option value="Utilities">Utilities</option>
          </select>

          <button className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-50 bg-white cursor-pointer font-medium">
            Date Range
          </button>
        </div>
      </div>

      {/* Main Content Area (List + Form) */}
      <div className="main flex flex-col lg:flex-row gap-6 p-6">

        {/* Expenses List */}
        <div className="left w-full lg:w-3/5 bg-white text-slate-800 rounded-xl shadow-sm border border-slate-100 p-5 overflow-x-auto">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Expenses History</h2>

          {/* Table Header */}
          <div className="grid grid-cols-5 text-sm font-semibold text-slate-500 border-b border-slate-200 pb-3 mb-3">
            <span>Date</span>
            <span>Description</span>
            <span>Category</span>
            <span>Amount</span>
            <span className="text-right">Action</span>
          </div>

          {/* Table Rows */}
          <div className="flex flex-col gap-3">
            {filteredExpenses.map((item, index) => (
              <div
                key={item.id || index}
                className="grid grid-cols-5 items-center text-sm py-2 border-b border-slate-100 last:border-none"
              >
                <span className="text-slate-600">{item.date}</span>
                <span className="font-medium text-slate-900">{item.description}</span>
                <span className="text-slate-600">{item.category}</span>
                <span className="font-semibold text-slate-900">{item.amount}</span>
                <span className="text-right cursor-pointer text-slate-400 hover:text-slate-600 font-bold">{item.action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Add Expense Form */}
        <form
          onSubmit={handleSubmitExpense}
          className="flex flex-col border w-full lg:w-2/5 rounded-xl border-slate-200 bg-white p-5 shadow-sm h-fit"
        >
          <div className="top">
            <h1 className="text-xl font-bold text-slate-900 mb-4">Add Expense</h1>
          </div>

          <div className="flex flex-col gap-3">
            {/* Amount */}
            <div className="flex flex-col">
              <label htmlFor="amount" className="mb-1 font-medium text-sm text-slate-700">Amount*</label>
              <input
                type="number"
                id="amount"
                min="0.01"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
                className="h-10 px-3 border rounded-md border-slate-300 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col">
              <label htmlFor="selectedCategory" className="mb-1 font-medium text-sm text-slate-700">Category*</label>
              <select
                name="selectedCategory"
                id="selectedCategory"
                required
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                className="h-10 px-3 rounded-md border border-slate-300 focus:outline-none focus:border-blue-500 bg-white cursor-pointer"
              >
                <option value="" disabled>Select a category</option>
                <option value="Food & Dining">Food &amp; Dining</option>
                <option value="Groceries">Groceries</option>
                <option value="Transportation">Transportation</option>
                <option value="Housing & Rent">Housing &amp; Rent</option>
                <option value="Utilities">Utilities</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Shopping">Shopping</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Education">Education</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Travel">Travel</option>
                <option value="EMI & Loans">EMI &amp; Loans</option>
                <option value="Insurance">Insurance</option>
                <option value="Family & Gifts">Family &amp; Gifts</option>
              </select>
            </div>

            {/* Date */}
            <div className="flex flex-col">
              <label htmlFor="date" className="mb-1 font-medium text-sm text-slate-700">Select Date*</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                name="date"
                required
                className="h-10 px-3 rounded-md border border-slate-300 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label htmlFor="description" className="mb-1 font-medium text-sm text-slate-700">Description (optional)</label>
              <textarea
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description..."
                className="p-3 rounded-md border border-slate-300 h-24 focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="footer flex flex-row gap-2 mt-5 justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="border border-slate-300 hover:bg-slate-100 cursor-pointer font-medium rounded-md px-4 py-2 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer font-medium rounded-md px-4 py-2 transition-colors text-sm shadow-sm"
            >
              Save Expense
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Transactions;