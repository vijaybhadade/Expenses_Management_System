import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
const ExpenseBreakDown = () => {
 const expenseData = [
  { category: "Food & Dining", amount: 5000 },
  { category: "Groceries", amount: 2000 },
  { category: "Transportation", amount: 1500 },
  { category: "Shopping", amount: 3000 },
  { category: "Utilities", amount: 1250 },
  { category: "Other", amount: 2000 },
];

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#db2777",
  "#8b5cf6",
  "#64748b",
];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
  <h2 className="mb-4 text-xl font-semibold">
    Expense Breakdown
  </h2>

  <ResponsiveContainer w="100%" height={300}>
    <PieChart>
      <Pie
        data={expenseData}
        dataKey="amount"
        nameKey="category"
        cx="50%"
        cy="50%"
        outerRadius={100}
        innerRadius={60}
        paddingAngle={3}
      >
        {expenseData.map((entry, index) => (
          <Cell
            key={entry.category}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>

      <Tooltip formatter={(value) => `₹${value}`} />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
</div>
  )
}

export default ExpenseBreakDown;
