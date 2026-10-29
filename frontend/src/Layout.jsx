import   SideBar  from "./components/sideBar";
import   Dashboard  from "./pages/DashBord";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="flex ">
      <SideBar />
      <main className="min-w-0 flex-1 bg-slate-200 p-6">
        <Outlet/>
        <Dashboard/>
      </main>
    </div>
  )
}

export default Layout;
