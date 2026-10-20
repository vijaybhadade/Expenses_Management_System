import {
  MoveUp,
  Star,
  Wallet,
  FileSpreadsheet
} from "lucide-react";

// Helper object to map array color strings to Tailwind classes
const colorClasses = {
  red: {
    text: "text-red-500",
    bg: "bg-red-50",
  },
  blue: {
    text: "text-blue-500",
    bg: "bg-blue-50",
  },
  Yellow: {
    text: "text-amber-500",
    bg: "bg-amber-50",
  },
  green: {
    text: "text-green-500",
    bg: "bg-green-50",
  },
};

const Transactions = () => {
  const summaryCards = [
    {
      title: "Total Expenses",
      amount: "₹14,750",
      icon: Wallet,
      color: "red",
      percentage: "6.7%",
      trend: MoveUp,
      trendColor: "red",
    },
    {
      title: "This month",
      amount: "₹12,320",
      icon: MoveUp,
      color: "blue",
      percentage: "8.3%",
      trend: MoveUp,
      trendColor: "red",
    },
    {
      title: "Largest Expense",
      amount: "₹3,980",
      icon: Star,
      color: "Yellow",
      subject: "House & rent",
    },
    {
      title: "Most used category",
      subject: "Food & Dining",
      icon: FileSpreadsheet,
      color: "green",
      percentage: "34% total expense"
    },
  ];

  return (
    <>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map((item, index) => {
            const IconComponent = item.icon;
            // Fallback to slate if color isn't matched
            const theme = colorClasses[item.color] || { text: "text-slate-600", bg: "bg-slate-100" };

            return (
              <div 
                key={index} 
                className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between"
              >
                <nav className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-slate-500">{item.title}</span>
                  {IconComponent && (
                    <div className={`p-2 rounded-lg ${theme.bg}`}>
                      <IconComponent className={`w-5 h-5 ${theme.text}`} />
                    </div>
                  )}
                </nav>

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
                      {item.trend && <item.trend className={`w-4 h-4 ${colorClasses[item.trendColor]?.text || "text-slate-500"}`} />}
                      {item.percentage}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-6">
        <input
          type="text"
          placeholder="Search expenses..."
          className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500 md:max-w-sm"
        />

        <div className="flex flex-wrap gap-3">
          <select className="rounded-lg border cursor-pointer border-slate-300 px-3 py-2 bg-white">
            <option value="" className="cursor-pointer">All Categories</option>
            <option value="Food & Dining" className=" cursor-pointer">Food & Dining</option>
            <option value="Groceries" className=" cursor-pointer">Groceries</option>
            <option value="Transportation" className=" cursor-pointer">Transportation</option>
            <option value="Housing & Rent" className=" cursor-pointer">Housing & Rent</option>
          </select>

          <button className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-50 bg-white">
            Date Range
          </button>
        </div>
        {/* transactions records details */}
        <div className="main">

        </div>
      </div>
    </>
  );
};

export default Transactions;