
import { useState } from "react";
import {
  MoveUp,
  Star,
  Wallet,
  FileSpreadsheet,
  ChevronDown
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

  // Date range states 
  const [showDateRange, setShowDateRange] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState("All Time");

  // Custom range states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [expenseDetails, setExpenseDetails] = useState([
    {
      id: "200",
      date: "28 Oct 2026",
      category: "Food & Dining",
      description: "Groceries",
      amount: 1250,
      action: "..."
    },
    {
      id: "201",
      date: "27 Oct 2026",
      category: "Groceries",
      description: "Monthly Groceries",
      amount: 2350,
      action: "..."
    },
    {
      id: "202",
      date: "26 Oct 2026",
      category: "Utilities",
      description: "Electricity bill",
      amount: 1800,
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

    if (!date) return;

    // Format date from YYYY-MM-DD to DD MMM YYYY
    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    // Validate number 
    if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
      return;
    }

    const newExpense = {
      id: String(Date.now()),
      date: formattedDate,
      category: formCategory,
      description: description || "No description",
      amount: Number(amount),
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

  // Calculate total Expense
  const totalExpense = expenseDetails.reduce(
    (total, item) => total + item.amount,
    0
  );

  // Calculate this month
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const thisMonthExpense = expenseDetails.filter((item) => {
    const expenseDate = new Date(item.date);
    return (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });

  const monthExpense = thisMonthExpense.reduce(
    (data, item) => data + item.amount,
    0
  );

  // Calculate largest expense (safely handles empty state)
  const largestExpense = expenseDetails.length > 0
    ? expenseDetails.reduce(
        (largest, item) => (item.amount > largest.amount ? item : largest),
        expenseDetails[0]
      )
    : { amount: 0, category: "N/A" };

  // Count expense category occurrences
  const categoryCount = expenseDetails.reduce((count, item) => {
    count[item.category] = (count[item.category] || 0) + 1;
    return count;
  }, {});

  // Find most used category safely
  const mostUsedCategory = Object.keys(categoryCount).length > 0
    ? Object.keys(categoryCount).reduce(
        (mostUsed, category) =>
          categoryCount[category] > categoryCount[mostUsed]
            ? category
            : mostUsed,
        Object.keys(categoryCount)[0]
      )
    : "N/A";

  const summaryCards = [
    {
      id: "100",
      title: "Total Expenses",
      amount: totalExpense,
      icon: Wallet,
      color: "red",
      percentage: "6.7%",
      trend: MoveUp,
      trendColor: "red",
    },
    {
      id: "101",
      title: "This Month",
      amount: monthExpense,
      icon: MoveUp,
      color: "blue",
      percentage: "8.3%",
      trend: MoveUp,
      trendColor: "red",
    },
    {
      id: "102",
      title: "Largest Expense",
      amount: largestExpense.amount,
      icon: Star,
      color: "yellow",
      subject: largestExpense.category,
    },
    {
      id: "103",
      title: "Most Used Category",
      subject: mostUsedCategory,
      icon: FileSpreadsheet,
      color: "green",
      percentage: `${expenseDetails.length > 0 ? Math.round(((categoryCount[mostUsedCategory] || 0) / expenseDetails.length) * 100) : 0}% of transactions`
    },
  ];

  // Filter by date range
  const filterDatarange = expenseDetails.filter((item) => {
    const now = new Date();
    const expenseDate = new Date(item.date);

    if (selectedDateRange === "All Time") {
      return true;
    }

    if (selectedDateRange === "This Month") {
      return (
        expenseDate.getMonth() === now.getMonth() &&
        expenseDate.getFullYear() === now.getFullYear()
      );
    }

    if (selectedDateRange === "Last Month") {
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return (
        expenseDate.getMonth() === lastMonth.getMonth() &&
        expenseDate.getFullYear() === lastMonth.getFullYear()
      );
    }

    if (selectedDateRange === "Last 30 Days") {
      const start = new Date(now);
      start.setDate(start.getDate() - 29);
      start.setHours(0, 0, 0, 0);

      const end = new Date(now);
      end.setHours(23, 59, 59, 999);

      return expenseDate >= start && expenseDate <= end;
    }

    if (selectedDateRange === "Custom Range") {
      if (!startDate || !endDate || startDate > endDate) {
        return true;
      }

      const start = new Date(`${startDate}T00:00:00`);
      const end = new Date(`${endDate}T23:59:59.999`);

      return expenseDate >= start && expenseDate <= end;
    }

    return true;
  });

  // Filter transactions based on category and search
  const filteredExpenses = filterDatarange.filter((item) => {
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
                  {item.amount !== undefined ? (
                    <span className="text-lg font-semibold text-slate-900">
                      {typeof item.amount === "number"
                        ? `₹${item.amount.toLocaleString("en-IN")}`
                        : item.amount}
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

        <div className="flex flex-wrap gap-3 items-center">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border cursor-pointer border-slate-300 px-3 py-2 bg-white outline-none"
          >
            <option value="ALL">All Categories</option>
            <option value="Food & Dining">Food & Dining</option>
            <option value="Groceries">Groceries</option>
            <option value="Transportation">Transportation</option>
            <option value="Housing & Rent">Housing & Rent</option>
            <option value="Utilities">Utilities</option>
          </select>

          <div className="relative">
            <button
              onClick={() => setShowDateRange(!showDateRange)}
              className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-50 bg-white cursor-pointer font-medium text-slate-700 flex items-center gap-2"
            >
              <span>{selectedDateRange}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showDateRange && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg z-10 py-1">
                {["All Time", "This Month", "Last Month", "Last 30 Days", "Custom Range"].map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setSelectedDateRange(range);
                      if (range !== "Custom Range") {
                        setShowDateRange(false);
                      }
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                      selectedDateRange === range ? "font-semibold text-blue-600 bg-blue-50" : "text-slate-700"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}

            {/* Custom date range modal/card */}
            {selectedDateRange === "Custom Range" && showDateRange && (
              <div className="absolute right-0 top-full mt-2 z-20 w-72 rounded-lg border border-slate-200 bg-white p-4 shadow-lg">
                <h3 className="mb-3 font-semibold text-slate-800 text-sm">
                  Select Date Range
                </h3>

                <div className="flex flex-col gap-3">
                  <div>
                    <label
                      htmlFor="startDate"
                      className="mb-1 block text-xs text-slate-600"
                    >
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      value={startDate}
                      max={endDate || undefined}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="endDate"
                      className="mb-1 block text-xs text-slate-600"
                    >
                      End Date
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      value={endDate}
                      min={startDate || undefined}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="flex gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => setShowDateRange(false)}
                      className="w-1/2 rounded-md border border-slate-300 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      disabled={!startDate || !endDate || startDate > endDate}
                      onClick={() => setShowDateRange(false)}
                      className="w-1/2 rounded-md bg-blue-600 px-3 py-1.5 text-xs text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
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
            {filteredExpenses.length === 0 ? (
              <p className="text-center text-slate-400 py-8 text-sm">No expenses found.</p>
            ) : (
              filteredExpenses.map((item, index) => (
                <div
                  key={item.id || index}
                  className="grid grid-cols-5 items-center text-sm py-2 border-b border-slate-100 last:border-none"
                >
                  <span className="text-slate-600">{item.date}</span>
                  <span className="font-medium text-slate-900">{item.description}</span>
                  <span className="text-slate-600">{item.category}</span>
                  <span className="font-semibold text-slate-900">
                    ₹{item.amount.toLocaleString("en-IN")}
                  </span>
                  <span className="text-right cursor-pointer text-slate-400 hover:text-slate-600 font-bold">
                    {item.action}
                  </span>
                </div>
              ))
            )}
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
                min="1.00"
                step="any"
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
                <option value="Food & Dining">Food & Dining</option>
                <option value="Groceries">Groceries</option>
                <option value="Transportation">Transportation</option>
                <option value="Housing & Rent">Housing & Rent</option>
                <option value="Utilities">Utilities</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Shopping">Shopping</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Education">Education</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Travel">Travel</option>
                <option value="EMI & Loans">EMI & Loans</option>
                <option value="Insurance">Insurance</option>
                <option value="Family & Gifts">Family & Gifts</option>
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
                className="p-3 rounded-md border border-slate-300 h-24 focus:outline-none focus:border-blue-500 resize-none"
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
