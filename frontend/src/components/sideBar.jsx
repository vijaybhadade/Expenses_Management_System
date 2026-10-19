import { NavLink } from "react-router-dom";
import { House, Wallet, Download, Settings, Goal, ChevronDown, ArrowLeftRight, CalendarDays, ChartNoAxesCombined } from "lucide-react";

const navItems = [
    { name: 'Dashboard', path: '/', icon: House },
    { name: 'Expenses', path: '/expenses', icon: Download },
    { name: 'Income', path: '/income', icon: Wallet },
    { name: 'Budgets', path: '/budgets', icon: Goal },
    { name: 'Transactions', path: '/transactions', icon: ArrowLeftRight },
    { name: 'Recurring', path: '/recurring', icon: CalendarDays },
    { name: 'Reports', path: '/reports', icon: ChartNoAxesCombined },

];
function Sidebar() {

    return (
        <aside className="flex min-h-screen w-64 flex-col bg-slate-900 p-6 text-white">
            <div className=" flex flex-col ">
                {/* ExpenseWise logo */}
                <h1 className="text-2xl font-bold text-green-400">
                    ExpenseWise
                </h1>
                <nav className="mt-6 ">
                    {/* Existing navItems.map(...) */}
                    {navItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === '/'}
                                className={({ isActive }) =>
                                    `flex h-10 w-full items-center gap-4 rounded-md px-3 mt-2
                            ${isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'text-slate-300 hover:bg-blue-700 hover:text-white'
                                    }`
                                }
                            >
                                <Icon size={20} />
                                <span>{item.name}</span>
                            </NavLink>
                        );
                    })}
                </nav>
                <div className="my-4 border-t border-slate-700" />
                <NavLink to="/settings" className={({ isActive }) =>
                    `flex  h-10 w-full items-center gap-4 rounded-md px-3 mt-4 
                            ${isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-blue-700 hover:text-white'
                    }`
                }>
                    <Settings size={20} />
                    <span>Settings</span>

                </NavLink>

            </div>
            {/* Existing profile section */}
            <div className="mt-auto flex items-center gap-3 border-t border-slate-700 pt-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-400">
                    V
                </div>
                <div className="profile-details flex flex-col ">
                    <span className="truncate font-medium">Vijay Bhadade</span>
                    <span className="text-sm text-slate-400">User</span>
                </div>
                <ChevronDown size={20} />
            </div>
        </aside>
    )
}

export default Sidebar;