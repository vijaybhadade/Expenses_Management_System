import IncomeExpenseChart from "../components/charts/IncomeExpenseChart";
import ExpenseBreakdownChart from "../components/charts/ExpenseBreakDown";
import { CalendarDays, ChevronDown, BellRing, Wallet, MoveDown, MoveUp, PiggyBank } from "lucide-react";
const summaryCards = [
    {
        title: "Total Balance",
        amount: "₹45,250",
        icon: Wallet,
        color: "blue",
        percentage: "12.5%",
        trend: MoveUp,
        trendColor: "green",
    },
    {
        title: "Total Income",
        amount: "₹60,000",
        icon: MoveUp,
        color: "green",
        percentage: "8.3%",
        trend: MoveUp,
        trendColor: "green",
    },
    {
        title: "Total Expense",
        amount: "₹14,750",
        icon: MoveDown,
        color: "red",
        percentage: "6.7%",
        trend: MoveDown,
        trendColor: "red",
    },
    {
        title: "Savings Rate",
        amount: "75.4%",
        icon: PiggyBank,
        color: "green",
        percentage: "5.2%",
        trend: MoveUp,
        trendColor: "green",
    },
];
const DashBord = () => {
    return (
        <div >    {/* dashboard top section*/}
            <nav className="top flex justify-between  ">
                <div className="left flex flex-col ">
                    <span className="truncate font-bold text-4xl">DashBord</span>
                    <span className="text-sm text-slate-400">Here's your financial Overview.</span>
                </div>
                <div className="right flex  gap-6 justify-center items-center">
                    <div className="calender flex  border-gray-400  border-2 rounded-sm  gap-2 items-center h-7 cursor-pointer ">
                        <CalendarDays size={20} />
                        <span>October 2026</span>
                        <ChevronDown size={20} />
                    </div>
                    <div className="notification flex h-10 w-10 shrink-0 items-center justify-center rounded-full ">
                        <BellRing size={20} />
                    </div>
                    <div className="logo flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-400">
                        V
                    </div>
                </div>
            </nav>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {
                    summaryCards.map((item) => {
                        const Icon = item.icon;
                        const TrendIcon = item.trend;
                        const iconColors = {
                            blue: "text-blue-600",
                            green: "text-green-600",
                            red: "text-red-600",
                        };

                        const trendColors = {
                            green: "text-green-600",
                            red: "text-red-600",
                        };
                        const iconBackgrounds = {
                            blue: "bg-blue-100",
                            green: "bg-green-100",
                            red: "bg-red-100",
                        };
                        return (
                            <div key={item.title} className="flex min-h-36 gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${iconBackgrounds[item.color]} ${iconColors[item.color]}`}>
                                    <Icon size={20} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <span className="font-medium">{item.title}</span>
                                    <span className="text-3xl font-bold">{item.amount}</span>

                                    <span className={`flex items-center gap-2 ${trendColors[item.trendColor]}`}>
                                        <TrendIcon size={18} />
                                        {item.percentage} vs. last month
                                    </span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2 ">
                <IncomeExpenseChart />
                <ExpenseBreakdownChart/>
            </div>
            
        </div>
    )
}

export default DashBord;
