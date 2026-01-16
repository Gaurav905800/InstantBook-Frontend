import { Outlet } from "react-router-dom";
import Nav from "../../components/dashboard/Nav";
import Sidebar from "../../components/dashboard/Sidebar";

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Nav />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
