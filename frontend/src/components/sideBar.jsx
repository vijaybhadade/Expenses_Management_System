import { NavLink } from "react-router-dom";
function Sidebar() {
    return (
        <aside className="min-h-screen w-64 bg-slate-900 p-6 text-white">
            <h1 className="text-2xl font-bold text-green-400">
                ExpenseWise
            </h1>
            <nav>
                <NavLink to="/" >
                    DashBoard
                </NavLink>
                <NavLink to="/">
                    Expenses
                </NavLink>
                <NavLink to="">Income</NavLink>
                <NavLink to="/">Budgets</NavLink>
                <NavLink to="/">Transactions</NavLink>
                <NavLink to="/">Recurring</NavLink>
                <NavLink to="/">Reports</NavLink>
            </nav>
            <nav>
                <NavLink>Settings</NavLink>
            </nav>
            <div className="footer-profile">
                <h1 className="icon"></h1>
                <div className="profile-details">
                    <h1 className="Name">Vijay Bhadade</h1>
                    <span className="role">User</span>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar