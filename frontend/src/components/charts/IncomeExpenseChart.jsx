import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

const IncomeExpenseChart = () => {
    const monthlyData = [
        { month: "May", income: 50000, expenses: 32000 },
        { month: "Jun", income: 60000, expenses: 35000 },
        { month: "Jul", income: 55000, expenses: 28000 },
        { month: "Aug", income: 65000, expenses: 40000 },
        { month: "Sep", income: 58000, expenses: 30000 },
        { month: "Oct", income: 60000, expenses: 14750 },
    ];
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h1 className="mb-4 text-xl font-semibold">
                Income vs. Expenses
            </h1>

            <ResponsiveContainer w="100%" height={300}>
                <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="income" fill="#16a34a" name="Income" />
                    <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default IncomeExpenseChart;
